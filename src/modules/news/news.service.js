import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/ApiError.js";
import { slugify } from "../../utils/slugify.js";

async function generateUniqueSlug(title) {
  const base = slugify(title);
  let candidate = base;
  let attempt = 1;

  // Extremely unlikely to loop more than once or twice in practice.
  while (await prisma.news.findUnique({ where: { slug: candidate } })) {
    attempt += 1;
    candidate = slugify(title, { suffix: attempt });
  }
  return candidate;
}

export async function listNews({ page, pageSize, category, published, search }) {
  const where = {
    ...(category ? { category } : {}),
    ...(published !== undefined ? { published } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search } },
            { body: { contains: search } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.news.count({ where }),
  ]);

  return {
    items,
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  };
}

export async function getNewsById(id) {
  const news = await prisma.news.findUnique({ where: { id } });
  if (!news) throw ApiError.notFound("Новость не найдена");
  return news;
}

export async function getNewsBySlug(slug) {
  const isNumeric = /^\d+$/.test(slug);
  const news = await prisma.news.findFirst({
    where: {
      OR: [
        { slug },
        ...(isNumeric ? [{ id: parseInt(slug, 10) }] : []),
      ],
    },
  });
  if (!news || !news.published) throw ApiError.notFound("Новость не найдена");
  return news;
}

export async function createNews(data) {
  const slug = await generateUniqueSlug(data.title);
  return prisma.news.create({ data: { ...data, slug } });
}

export async function updateNews(id, data) {
  await getNewsById(id); // 404s if missing

  const nextData = { ...data };
  if (data.title) {
    // Only regenerate the slug if the title actually changed.
    const current = await prisma.news.findUnique({ where: { id } });
    if (current.title !== data.title) {
      nextData.slug = await generateUniqueSlug(data.title);
    }
  }

  return prisma.news.update({ where: { id }, data: nextData });
}

export async function deleteNews(id) {
  await getNewsById(id); // 404s if missing
  await prisma.news.delete({ where: { id } });
}

export async function listCategories() {
  const rows = await prisma.news.findMany({
    distinct: ["category"],
    select: { category: true },
    orderBy: { category: "asc" },
  });
  return rows.map((r) => r.category);
}
