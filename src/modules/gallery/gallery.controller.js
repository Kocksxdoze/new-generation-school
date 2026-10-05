import * as galleryService from "./gallery.service.js";

export async function listGalleryController(req, res) {
  const { category, featured } = req.query;
  const items = await galleryService.listGalleryItems({ category, featured });
  res.json({ success: true, data: items });
}

export async function getGalleryItemController(req, res) {
  const id = parseInt(req.params.id, 10);
  const item = await galleryService.getGalleryItemById(id);
  res.json({ success: true, data: item });
}

export async function createGalleryItemController(req, res) {
  const item = await galleryService.createGalleryItem(req.body);
  res.status(201).json({ success: true, data: item });
}

export async function updateGalleryItemController(req, res) {
  const id = parseInt(req.params.id, 10);
  const item = await galleryService.updateGalleryItem(id, req.body);
  res.json({ success: true, data: item });
}

export async function deleteGalleryItemController(req, res) {
  const id = parseInt(req.params.id, 10);
  await galleryService.deleteGalleryItem(id);
  res.json({ success: true, message: "Элемент галереи удален" });
}
