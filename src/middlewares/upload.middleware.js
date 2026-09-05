import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

// Files are grouped by year/month so a single folder never grows unbounded.
function resolveUploadSubdir() {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return path.join(year, month);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const subdir = resolveUploadSubdir();
    const fullDir = path.join(process.cwd(), env.uploads.dir, subdir);
    fs.mkdirSync(fullDir, { recursive: true });
    req.uploadSubdir = subdir;
    cb(null, fullDir);
  },
  filename(req, file, cb) {
    const uniqueName = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uniqueName}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(ApiError.badRequest(`Недопустимый тип файла: ${file.mimetype}`));
    return;
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.uploads.maxSizeBytes },
});
