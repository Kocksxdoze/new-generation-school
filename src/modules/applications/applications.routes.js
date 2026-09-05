import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
  listApplicationsQuerySchema,
  applicationIdParamSchema,
} from "./applications.validation.js";
import {
  createApplicationController,
  listApplicationsController,
  updateApplicationController,
  deleteApplicationController,
} from "./applications.controller.js";

// Public route: submit application
export const applicationsRouter = Router();
applicationsRouter.post(
  "/",
  validate({ body: createApplicationSchema }),
  createApplicationController
);

// Admin routes: manage applications
export const applicationsAdminRouter = Router();
applicationsAdminRouter.use(requireAuth, requireRole("ADMIN", "EDITOR"));

applicationsAdminRouter.get(
  "/",
  validate({ query: listApplicationsQuerySchema }),
  listApplicationsController
);
applicationsAdminRouter.patch(
  "/:id",
  validate({
    params: applicationIdParamSchema,
    body: updateApplicationStatusSchema,
  }),
  updateApplicationController
);
applicationsAdminRouter.delete(
  "/:id",
  validate({ params: applicationIdParamSchema }),
  deleteApplicationController
);
