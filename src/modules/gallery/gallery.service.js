import { prisma } from "../../config/db.js";
import { ApiError } from "../../utils/ApiError.js";

export async function listGalleryItems({ category, featured } = {}) {
  const where = {};
  if (category && category !== "all") where.category = category;
  if (featured !== undefined) where.featured = featured === "true" || featured === true;

  return prisma.galleryItem.findMany({
    where,
    orderBy: [{ order: "asc" }, { id: "desc" }],
  });
}

export async function getGalleryItemById(id) {
  const item = await prisma.galleryItem.findUnique({ where: { id } });
  if (!item) throw ApiError.notFound("Элемент галереи не найден");
  return item;
}

export async function createGalleryItem(data) {
  return prisma.galleryItem.create({
    data: {
      title: data.title || "",
      caption: data.caption || "",
      type: data.type || "image",
      url: data.url,
      thumbnailUrl: data.thumbnailUrl || "",
      category: data.category || "campus",
      featured: data.featured === true || data.featured === "true",
      order: data.order !== undefined ? parseInt(data.order, 10) : 0,
    },
  });
}

export async function updateGalleryItem(id, data) {
  await getGalleryItemById(id);
  const payload = { ...data };
  if (payload.order !== undefined) payload.order = parseInt(payload.order, 10);
  if (payload.featured !== undefined) payload.featured = payload.featured === true || payload.featured === "true";
  return prisma.galleryItem.update({
    where: { id },
    data: payload,
  });
}

export async function deleteGalleryItem(id) {
  await getGalleryItemById(id);
  return prisma.galleryItem.delete({ where: { id } });
}
