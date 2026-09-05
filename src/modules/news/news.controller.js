import { sendSuccess } from "../../utils/ApiResponse.js";
import * as newsService from "./news.service.js";

// --- Public endpoints (only published news) ---

export async function listPublicNewsController(req, res) {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const result = await newsService.listNews({ ...req.query, page, pageSize, published: true });
  sendSuccess(res, { data: result.items, meta: result.meta });
}

export async function getPublicNewsBySlugController(req, res) {
  const news = await newsService.getNewsBySlug(req.params.slug);
  sendSuccess(res, { data: news });
}

export async function listCategoriesController(req, res) {
  const categories = await newsService.listCategories();
  sendSuccess(res, { data: categories });
}

// --- Admin endpoints (all news, including drafts) ---

export async function listAdminNewsController(req, res) {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const result = await newsService.listNews({ ...req.query, page, pageSize });
  sendSuccess(res, { data: result.items, meta: result.meta });
}

export async function getAdminNewsController(req, res) {
  const news = await newsService.getNewsById(req.params.id);
  sendSuccess(res, { data: news });
}

export async function createNewsController(req, res) {
  const news = await newsService.createNews(req.body);
  sendSuccess(res, { statusCode: 201, data: news });
}

export async function updateNewsController(req, res) {
  const news = await newsService.updateNews(req.params.id, req.body);
  sendSuccess(res, { data: news });
}

export async function deleteNewsController(req, res) {
  await newsService.deleteNews(req.params.id);
  sendSuccess(res, { data: null });
}
