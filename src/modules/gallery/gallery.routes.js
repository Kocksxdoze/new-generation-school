import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import {
  listGalleryController,
  getGalleryItemController,
  createGalleryItemController,
  updateGalleryItemController,
  deleteGalleryItemController,
} from "./gallery.controller.js";

// Public router for website
export const galleryRouter = Router();
galleryRouter.get("/", listGalleryController);
galleryRouter.get("/:id", getGalleryItemController);

// Protected router for admin panel
export const galleryAdminRouter = Router();
galleryAdminRouter.use(requireAuth, requireRole("ADMIN", "EDITOR"));
galleryAdminRouter.get("/", listGalleryController);
galleryAdminRouter.get("/:id", getGalleryItemController);
galleryAdminRouter.post("/", createGalleryItemController);
galleryAdminRouter.put("/:id", updateGalleryItemController);
galleryAdminRouter.patch("/:id", updateGalleryItemController);
galleryAdminRouter.delete("/:id", deleteGalleryItemController);
