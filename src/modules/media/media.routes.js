import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import {
  listMediaQuerySchema,
  mediaIdParamSchema,
  updateMediaSchema,
} from "./media.validation.js";
import {
  uploadMediaController,
  listMediaController,
  updateMediaController,
  deleteMediaController,
} from "./media.controller.js";

export const mediaRouter = Router();
mediaRouter.use(requireAuth, requireRole("ADMIN", "EDITOR"));

mediaRouter.get("/", validate({ query: listMediaQuerySchema }), listMediaController);
mediaRouter.post("/", upload.single("file"), uploadMediaController);
mediaRouter.patch(
  "/:id",
  validate({ params: mediaIdParamSchema, body: updateMediaSchema }),
  updateMediaController,
);
mediaRouter.delete("/:id", validate({ params: mediaIdParamSchema }), deleteMediaController);
