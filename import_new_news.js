import Database from "better-sqlite3";
import path from "node:path";
import { prisma } from "./src/config/db.js";
import { slugify } from "./src/utils/slugify.js";

const db = new Database("C:/Users/Surface PC/Desktop/db.sqlite3", { readonly: true });
const rows = db.prepare("SELECT * FROM news_news WHERE id >= 67 ORDER BY id ASC").all();

console.log(`Found ${rows.length} new news items in legacy DB.`);

for (const row of rows) {
  const date = new Date(row.date);
  const exists = await prisma.news.findFirst({
    where: {
      OR: [
        { title: row.title },
        { body: row.full_text }
      ]
    }
  });

  if (exists) {
    console.log(`Skipping existing: "${row.title}" (ID: ${exists.id})`);
    continue;
  }

  let slug = slugify(row.title);
  let attempt = 1;
  while (await prisma.news.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = slugify(row.title, { suffix: attempt });
  }

  const filename = path.basename(row.image);
  const coverImage = `/uploads/${filename}`;

  const created = await prisma.news.create({
    data: {
      title: row.title,
      slug,
      excerpt: row.full_text.slice(0, 190) + (row.full_text.length > 190 ? "..." : ""),
      body: row.full_text,
      category: row.category,
      date,
      externalUrl: row.link || null,
      coverImage,
      published: true,
    }
  });

  console.log(`✔ Imported news [${created.id}]: "${created.title}" (date: ${row.date}, cover: ${coverImage})`);
}

db.close();
const total = await prisma.news.count();
console.log(`Total news in Prisma dev.db now: ${total}`);
await prisma.$disconnect();
