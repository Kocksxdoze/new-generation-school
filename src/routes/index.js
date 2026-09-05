import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { newsRouter, newsAdminRouter } from "../modules/news/news.routes.js";
import { mediaRouter } from "../modules/media/media.routes.js";
import { siteRouter, pagesAdminRouter } from "../modules/pages/pages.routes.js";
import { applicationsRouter, applicationsAdminRouter } from "../modules/applications/applications.routes.js";

export const apiRouter = Router();

// --- Public: consumed by the Next.js frontend ---
apiRouter.use("/news", newsRouter);
apiRouter.use("/site", siteRouter);
apiRouter.use("/applications", applicationsRouter);

// --- Auth (login is public, the rest requires a session) ---
apiRouter.use("/auth", authRouter);

// --- Admin panel only, protected inside each router ---
apiRouter.use("/admin/news", newsAdminRouter);
apiRouter.use("/admin/media", mediaRouter);
apiRouter.use("/admin/pages", pagesAdminRouter);
apiRouter.use("/admin/applications", applicationsAdminRouter);

apiRouter.get("/health", (req, res) => res.json({ success: true, data: "ok" }));
