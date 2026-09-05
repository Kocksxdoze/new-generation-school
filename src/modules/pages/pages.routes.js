import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  pageSlugParamSchema,
  sectionIdParamSchema,
  createPageSchema,
  createSectionSchema,
  updateSectionSchema,
  reorderSectionsSchema,
} from "./pages.validation.js";
import {
  getPublicPageController,
  listPagesController,
  getAdminPageController,
  createPageController,
  addSectionController,
  updateSectionController,
  deleteSectionController,
  reorderSectionsController,
} from "./pages.controller.js";

// Public: frontend reads page content to render dynamically.
export const siteRouter = Router();
siteRouter.get(
  "/:slug",
  validate({ params: pageSlugParamSchema }),
  getPublicPageController,
);

// Admin: manage pages and their ordered sections.
export const pagesAdminRouter = Router();
pagesAdminRouter.use(requireAuth, requireRole("ADMIN", "EDITOR"));

pagesAdminRouter.get("/", listPagesController);
pagesAdminRouter.post(
  "/",
  validate({ body: createPageSchema }),
  createPageController,
);
pagesAdminRouter.get(
  "/:slug",
  validate({ params: pageSlugParamSchema }),
  getAdminPageController,
);
pagesAdminRouter.post(
  "/:slug/sections",
  validate({ params: pageSlugParamSchema, body: createSectionSchema }),
  addSectionController,
);
pagesAdminRouter.post(
  "/:slug/sections/reorder",
  validate({ params: pageSlugParamSchema, body: reorderSectionsSchema }),
  reorderSectionsController,
);
pagesAdminRouter.patch(
  "/sections/:id",
  validate({ params: sectionIdParamSchema, body: updateSectionSchema }),
  updateSectionController,
);
pagesAdminRouter.delete(
  "/sections/:id",
  validate({ params: sectionIdParamSchema }),
  deleteSectionController,
);
