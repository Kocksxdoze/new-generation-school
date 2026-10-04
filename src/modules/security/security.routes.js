import { Router } from "express";
import { recordSecurityEvent, getSecurityEvents } from "./security.store.js";

export const securityRouter = Router();

const SYNC_KEY = process.env.SECURITY_SYNC_KEY || "ngs_sec_sync_2026_key";

/**
 * Public client tracking endpoint.
 * Called automatically by frontend on page loads (from mobile phones, tablets, desktops).
 */
securityRouter.post("/track", (req, res) => {
  const rawIp =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress ||
    "127.0.0.1";
  const ip = rawIp.toString().split(",")[0].trim();

  const userAgent = req.headers["user-agent"] || "";
  const { path: pagePath = "/", referrer = "", screen = "", lang = "", details: customDetails = "" } = req.body || {};

  let action = "VISIT_HOME";
  if (pagePath === "/admin/login") action = "ADMIN_LOGIN_PAGE_VIEW";
  else if (pagePath.startsWith("/admin/applications")) action = "ADMIN_VIEW_LEADS";
  else if (pagePath.startsWith("/admin/news")) action = "ADMIN_MANAGE_NEWS";
  else if (pagePath.startsWith("/admin/media")) action = "ADMIN_MANAGE_MEDIA";
  else if (pagePath.startsWith("/admin")) action = "ADMIN_PORTAL_VIEW";
  else if (pagePath === "/apply") action = "VISIT_APPLY_PAGE";
  else if (pagePath.startsWith("/news/")) action = "VISIT_NEWS_ARTICLE";
  else if (pagePath === "/news") action = "VISIT_NEWS_LIST";
  else if (pagePath !== "/") action = `VISIT: ${pagePath}`;

  const metaParts = [];
  if (screen) metaParts.push(`Экран: ${screen}`);
  if (lang) metaParts.push(`Язык: ${lang}`);
  if (referrer) metaParts.push(`Источник: ${referrer}`);
  if (customDetails) metaParts.push(customDetails);

  const threatDetails = metaParts.join(" | ");

  const event = recordSecurityEvent({
    timestamp: new Date().toISOString(),
    ip,
    method: "GET",
    endpoint: pagePath,
    action,
    statusCode: 200,
    responseTimeMs: 0,
    userAgent,
    threatLevel: "NORMAL",
    threatDetails,
  });

  return res.status(200).json({ success: true, received: true });
});

/**
 * Sync endpoint for the Python Security Monitor.
 * Secured by X-Security-Key header or ?key= query parameter.
 */
securityRouter.get("/events", (req, res) => {
  const providedKey = req.headers["x-security-key"] || req.query.key;

  if (providedKey !== SYNC_KEY) {
    return res.status(403).json({
      success: false,
      error: "FORBIDDEN",
      message: "Неверный ключ доступа к журналу безопасности",
    });
  }

  const { since, limit } = req.query;
  const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 500, 1), 2000);
  const events = getSecurityEvents(since, parsedLimit);

  return res.status(200).json({
    success: true,
    count: events.length,
    events,
  });
});
