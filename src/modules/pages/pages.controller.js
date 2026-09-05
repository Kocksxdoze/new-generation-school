import { sendSuccess } from "../../utils/ApiResponse.js";
import * as pagesService from "./pages.service.js";

// --- Public: the Next.js frontend fetches one page (with its sections) at
// a time to render, e.g. GET /api/site/home ---

export async function getPublicPageController(req, res) {
  const page = await pagesService.getPageBySlug(req.params.slug);
  sendSuccess(res, { data: page });
}

// --- Admin ---

export async function listPagesController(req, res) {
  const pages = await pagesService.listPages();
  sendSuccess(res, { data: pages });
}

export async function getAdminPageController(req, res) {
  const page = await pagesService.getPageBySlug(req.params.slug);
  sendSuccess(res, { data: page });
}

export async function createPageController(req, res) {
  const page = await pagesService.createPage(req.body);
  sendSuccess(res, { statusCode: 201, data: page });
}

export async function addSectionController(req, res) {
  const section = await pagesService.addSection(req.params.slug, req.body);
  sendSuccess(res, { statusCode: 201, data: section });
}

export async function updateSectionController(req, res) {
  const section = await pagesService.updateSection(req.params.id, req.body);
  sendSuccess(res, { data: section });
}

export async function deleteSectionController(req, res) {
  await pagesService.deleteSection(req.params.id);
  sendSuccess(res, { data: null });
}

export async function reorderSectionsController(req, res) {
  const page = await pagesService.reorderSections(req.params.slug, req.body.order);
  sendSuccess(res, { data: page });
}
