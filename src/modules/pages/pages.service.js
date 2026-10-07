import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/ApiError.js";

// Section.data is stored as a JSON string in SQLite. These helpers keep the
// serialize/deserialize logic in one place so the rest of the module can
// work with plain objects.
function parseSection(section) {
  return { ...section, data: JSON.parse(section.data) };
}

function parsePage(page) {
  return {
    ...page,
    sections: page.sections?.map(parseSection).sort((a, b) => a.order - b.order),
  };
}

export async function getPageBySlug(slug) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: { sections: true },
  });
  if (!page) throw ApiError.notFound(`Страница "${slug}" не найдена`);
  return parsePage(page);
}

export async function listPages() {
  const pages = await prisma.page.findMany({
    include: { sections: false },
    orderBy: { title: "asc" },
  });
  return pages;
}

export async function createPage({ slug, title }) {
  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing) throw ApiError.conflict(`Страница "${slug}" уже существует`);
  return prisma.page.create({ data: { slug, title } });
}

export async function addSection(pageSlug, { type, order, visible, data }) {
  const page = await prisma.page.findUnique({
    where: { slug: pageSlug },
    include: { sections: true },
  });
  if (!page) throw ApiError.notFound(`Страница "${pageSlug}" не найдена`);

  const nextOrder = order ?? page.sections.length;

  const section = await prisma.section.create({
    data: {
      pageId: page.id,
      type,
      order: nextOrder,
      visible,
      data: JSON.stringify(data),
    },
  });
  return parseSection(section);
}

export async function updateSection(id, { visible, data }) {
  const existing = await prisma.section.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound("Блок не найден");

  const section = await prisma.section.update({
    where: { id },
    data: {
      ...(visible !== undefined ? { visible } : {}),
      ...(data !== undefined ? { data: JSON.stringify(data) } : {}),
    },
  });
  return parseSection(section);
}

export async function deleteSection(id) {
  const existing = await prisma.section.findUnique({ where: { id } });
  if (!existing) throw ApiError.notFound("Блок не найден");
  await prisma.section.delete({ where: { id } });
}

// Applies a full new ordering in one transaction so the page never sits in
// a half-reordered state if something goes wrong midway.
export async function reorderSections(pageSlugOrId, order) {
  let page = null;
  const numId = Number(pageSlugOrId);
  if (!isNaN(numId)) {
    page = await prisma.page.findUnique({ where: { id: numId } });
  }
  if (!page) {
    page = await prisma.page.findUnique({ where: { slug: String(pageSlugOrId) } });
  }
  if (!page) throw ApiError.notFound(`Страница "${pageSlugOrId}" не найдена`);

  await prisma.$transaction(
    order.map(({ id, order: newOrder }) =>
      prisma.section.update({ where: { id }, data: { order: newOrder } }),
    ),
  );

  return getPageBySlug(page.slug);
}
