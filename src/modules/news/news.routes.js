import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  listNewsQuerySchema,
  newsIdParamSchema,
  newsSlugParamSchema,
  createNewsSchema,
  updateNewsSchema,
} from "./news.validation.js";
import {
  listPublicNewsController,
  getPublicNewsBySlugController,
  listCategoriesController,
  listAdminNewsController,
  getAdminNewsController,
  createNewsController,
  updateNewsController,
  deleteNewsController,
} from "./news.controller.js";

// Public: consumed by the Next.js frontend, no auth required.
export const newsRouter = Router();
newsRouter.get("/", validate({ query: listNewsQuerySchema }), listPublicNewsController);
newsRouter.get("/categories", listCategoriesController);
newsRouter.get("/:slug", validate({ params: newsSlugParamSchema }), getPublicNewsBySlugController);

// Admin: full CRUD, requires a logged-in ADMIN or EDITOR.
export const newsAdminRouter = Router();
newsAdminRouter.use(requireAuth, requireRole("ADMIN", "EDITOR"));

newsAdminRouter.get("/", validate({ query: listNewsQuerySchema }), listAdminNewsController);
newsAdminRouter.get("/:id", validate({ params: newsIdParamSchema }), getAdminNewsController);
newsAdminRouter.post("/", validate({ body: createNewsSchema }), createNewsController);
newsAdminRouter.put(
  "/:id",
  validate({ params: newsIdParamSchema, body: updateNewsSchema }),
  updateNewsController,
);
newsAdminRouter.delete("/:id", validate({ params: newsIdParamSchema }), deleteNewsController);
