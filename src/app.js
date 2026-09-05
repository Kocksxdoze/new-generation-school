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
app.use(
  cors({
    origin: env.corsOrigins.length > 0 ? env.corsOrigins : true,
    credentials: true,
  }),
);
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
