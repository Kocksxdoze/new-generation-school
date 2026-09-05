import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  loginSchema,
  createUserSchema,
  changePasswordSchema,
} from "./auth.validation.js";
import {
  loginController,
  logoutController,
  meController,
  createUserController,
  changePasswordController,
} from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", validate({ body: loginSchema }), loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", requireAuth, meController);
authRouter.post(
  "/change-password",
  requireAuth,
  validate({ body: changePasswordSchema }),
  changePasswordController,
);

// Admin-only: provision new admin-panel accounts.
authRouter.post(
  "/users",
  requireAuth,
  requireRole("ADMIN"),
  validate({ body: createUserSchema }),
  createUserController,
);
