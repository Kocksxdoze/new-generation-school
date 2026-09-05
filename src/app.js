import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "node:path";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/error.middleware.js";

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

// Uploaded images/SVGs are served as static files, e.g. GET /uploads/2026/03/xyz.webp
app.use("/uploads", express.static(path.join(process.cwd(), env.uploads.dir)));

app.get("/", (req, res) => {
  res.json({ name: "New Generation School API", status: "online", time: new Date() });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
