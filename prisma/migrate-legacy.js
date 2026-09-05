// Imports data from the old Django-based site's SQLite database into the
// new Prisma schema. Safe to re-run: news are matched by title+date and
// skipped if already imported.
//
// Usage:
//   1. Place the old database file at prisma/legacy.sqlite
//   2. Copy the old Django MEDIA_ROOT folder contents into
//      backend/uploads/legacy-media/ (so image paths keep resolving)
//   3. npm run db:import-legacy

import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/utils/slugify.js";

const prisma = new PrismaClient();
const LEGACY_DB_PATH = path.join(process.cwd(), "prisma", "legacy.sqlite");

function mapLegacyImagePath(relativePath) {
  if (!relativePath) return null;
  // Old Django paths look like "post_images/<uuid>.jpeg". We namespace them
  // under /uploads/legacy-media/ so they're served the same way as new
  // uploads once you've copied the old media files into that folder.
  return `/uploads/legacy-media/${relativePath}`.replace(/\\/g, "/");
}

async function generateUniqueSlug(title, existingSlugs) {
  const base = slugify(title);
  let candidate = base;
  let attempt = 1;
  while (existingSlugs.has(candidate) || (await prisma.news.findUnique({ where: { slug: candidate } }))) {
    attempt += 1;
    candidate = slugify(title, { suffix: attempt });
  }
  existingSlugs.add(candidate);
  return candidate;
}

async function migrateNews(legacyDb) {
  const rows = legacyDb.prepare("SELECT * FROM news_news ORDER BY id ASC").all();
  const usedSlugs = new Set();
  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    const date = new Date(row.date);
    const already = await prisma.news.findFirst({ where: { title: row.title, date } });
    if (already) {
      skipped += 1;
      continue;
    }

    const slug = await generateUniqueSlug(row.title, usedSlugs);
    await prisma.news.create({
      data: {
        title: row.title,
        slug,
        body: row.full_text,
        excerpt: row.full_text.slice(0, 200),
        category: row.category,
        date,
        externalUrl: row.link || null,
        coverImage: mapLegacyImagePath(row.image),
        published: true,
      },
    });
    imported += 1;
  }

  console.log(`✔ News: imported ${imported}, skipped ${skipped} already-imported rows`);
}

async function migrateAdminUser(legacyDb) {
  // The old `users` table already stores a bcrypt hash compatible with
  // bcryptjs, so we can carry it over as-is (no password reset needed) —
  // but only if a user with that username doesn't already exist.
  const rows = legacyDb.prepare("SELECT * FROM users").all();

  for (const row of rows) {
    const existing = await prisma.user.findUnique({ where: { username: row.username } });
    if (existing) {
      console.log(`ℹ User "${row.username}" already exists — skipping.`);
      continue;
    }

    await prisma.user.create({
      data: {
        username: row.username,
        email: row.email,
        password: row.password, // already a bcrypt hash
        role: row.role?.toUpperCase() === "ADMIN" ? "ADMIN" : "EDITOR",
      },
    });
    console.log(`✔ Imported user "${row.username}" (${row.role})`);
  }
}

async function main() {
  if (!fs.existsSync(LEGACY_DB_PATH)) {
    console.error(`Legacy database not found at ${LEGACY_DB_PATH}`);
    console.error("Place the old .sqlite file there (see the comment at the top of this script) and re-run.");
    process.exitCode = 1;
    return;
  }

  const legacyDb = new Database(LEGACY_DB_PATH, { readonly: true });

  await migrateAdminUser(legacyDb);
  await migrateNews(legacyDb);

  legacyDb.close();
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
