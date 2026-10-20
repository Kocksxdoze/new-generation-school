import path from "node:path";
import fs from "node:fs/promises";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "../../config/db.js";
import { env } from "../../config/env.js";
import { s3Client } from "../../config/s3.js";
import { ApiError } from "../../utils/ApiError.js";

// Reads image dimensions when possible (skipped for SVG, which is
// resolution-independent).
async function readDimensions(absolutePath, mimeType) {
  if (mimeType === "image/svg+xml") return { width: null, height: null };
  try {
    const meta = await sharp(absolutePath).metadata();
    return { width: meta.width ?? null, height: meta.height ?? null };
  } catch {
    return { width: null, height: null };
  }
}

export async function saveUploadedFile(file, subdir, alt) {
  const absolutePath = path.join(process.cwd(), env.uploads.dir, subdir, file.filename);
  const { width, height } = await readDimensions(absolutePath, file.mimetype);

  // Store base64 data URI and upload to S3 bucket to survive ephemeral container wipes
  let base64Data = null;
  try {
    const fileBuffer = await fs.readFile(absolutePath);
    base64Data = `data:${file.mimetype};base64,${fileBuffer.toString("base64")}`;

    if (s3Client) {
      const s3Key = `${subdir}/${file.filename}`.replace(/\\/g, "/");
      await s3Client.send(new PutObjectCommand({
        Bucket: env.s3.bucket,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: file.mimetype,
      }));
      console.log(`[S3 Upload] Successfully pushed ${s3Key} to "${env.s3.bucket}"`);
    }
  } catch (err) {
    console.warn("Storage persistence backup note:", err.message);
  }

  return prisma.media.create({
    data: {
      filename: file.filename,
      url: `/uploads/${subdir}/${file.filename}`.replace(/\\/g, "/"),
      mimeType: file.mimetype,
      size: file.size,
      width,
      height,
      alt: alt ?? null,
      data: base64Data,
    },
  });
}

export async function listMedia({ page, pageSize }) {
  const [items, total] = await Promise.all([
    prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.media.count(),
  ]);
  return { items, meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } };
}

export async function updateMediaAlt(id, alt) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw ApiError.notFound("Файл не найден");
  return prisma.media.update({ where: { id }, data: { alt } });
}

export async function deleteMedia(id) {
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw ApiError.notFound("Файл не найден");

  const absolutePath = path.join(process.cwd(), env.uploads.dir, media.url.replace("/uploads/", ""));
  await fs.rm(absolutePath, { force: true });
  await prisma.media.delete({ where: { id } });
}
