import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "node:path";
import fs from "node:fs/promises";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "./config/db.js";
import { env } from "./config/env.js";
import { s3Client } from "./config/s3.js";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";
import { auditMiddleware } from "./middlewares/audit.middleware.js";
import { generalApiLimiter } from "./middlewares/rateLimit.middleware.js";

export const app = express();

app.use(helmet({ crossOriginResourcePolicy: false })); // allow <img> from other origins to load /uploads

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, server-to-server, mobile)
    if (!origin) return callback(null, true);

    // If explicit origins configured without wildcard, verify
    if (env.corsOrigins.length > 0 && !env.corsOrigins.includes("*")) {
      const isAllowed = env.corsOrigins.some((allowed) => {
        if (allowed === origin) return true;
        if (allowed.startsWith("*.") && origin.endsWith(allowed.slice(1))) return true;
        return false;
      });
      if (isAllowed) return callback(null, true);
    }

    // Allow all vercel preview/production domains and localhost
    if (origin.endsWith(".vercel.app") || origin.includes("localhost")) {
      return callback(null, true);
    }

    // Default: allow and reflect origin for cookie/auth support
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.isProduction ? "combined" : "dev"));

// Security Audit & Request Tracking
app.use(auditMiddleware);

// Uploaded images/SVGs are served as static files, e.g. GET /uploads/2026/03/xyz.webp
app.use("/uploads", express.static(path.join(process.cwd(), env.uploads.dir)));

// Self-healing media restore: if file is missing from ephemeral disk after container restart,
// fetch directly from Neon S3 bucket or reconstruct from database persistent base64 buffer.
app.use("/uploads", async (req, res, next) => {
  try {
    const rawPath = req.path;
    const s3Key = rawPath.replace(/^\//, "");
    const diskPath = path.join(process.cwd(), env.uploads.dir, rawPath);

    // 1. Try Neon S3 bucket
    if (s3Client) {
      try {
        const getCmd = new GetObjectCommand({
          Bucket: env.s3.bucket,
          Key: s3Key,
        });
        const s3Res = await s3Client.send(getCmd);
        const bytes = await s3Res.Body.transformToByteArray();
        const buffer = Buffer.from(bytes);

        // Cache to local disk for fast subsequent hits
        fs.mkdir(path.dirname(diskPath), { recursive: true })
          .then(() => fs.writeFile(diskPath, buffer))
          .catch(() => {});

        res.setHeader("Content-Type", s3Res.ContentType || "image/webp");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        return res.send(buffer);
      } catch (s3Err) {
        // Not in S3 or error, fall through to DB
      }
    }

    // 2. Fallback: Database persistent base64 buffer
    const requestedUrl = `/uploads${rawPath}`.replace(/\\/g, "/");
    const baseName = path.basename(rawPath);

    const media = await prisma.media.findFirst({
      where: {
        OR: [
          { url: requestedUrl },
          { filename: baseName },
        ],
      },
    });

    if (media && media.data) {
      const match = media.data.match(/^data:([^;]+);base64,(.+)$/);
      const mimeType = match ? match[1] : (media.mimeType || "image/webp");
      const base64Content = match ? match[2] : media.data;
      const buffer = Buffer.from(base64Content, "base64");

      // Asynchronously restore file to disk cache
      fs.mkdir(path.dirname(diskPath), { recursive: true })
        .then(() => fs.writeFile(diskPath, buffer))
        .catch(() => {});

      res.setHeader("Content-Type", mimeType);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      return res.send(buffer);
    }
  } catch (err) {
    console.error("[Media Restore Warning]", err.message);
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ name: "New Generation School API", status: "online", time: new Date() });
});

// Protected API routes with flood rate limiting
app.use("/api", generalApiLimiter, apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
