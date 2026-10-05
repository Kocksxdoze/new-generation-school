import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import {
  listTeachersController,
  getTeacherController,
  createTeacherController,
  updateTeacherController,
  deleteTeacherController,
} from "./teachers.controller.js";

// Public router for website
export const teachersRouter = Router();
teachersRouter.get("/", listTeachersController);
teachersRouter.get("/:id", getTeacherController);

// Protected router for admin panel
export const teachersAdminRouter = Router();
teachersAdminRouter.use(requireAuth, requireRole("ADMIN", "EDITOR"));
teachersAdminRouter.get("/", listTeachersController);
teachersAdminRouter.get("/:id", getTeacherController);
teachersAdminRouter.post("/", createTeacherController);
teachersAdminRouter.put("/:id", updateTeacherController);
teachersAdminRouter.patch("/:id", updateTeacherController);
teachersAdminRouter.delete("/:id", deleteTeacherController);
