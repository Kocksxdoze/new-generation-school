/**
 * Security Audit & Visit Tracker Middleware for NGS Backend.
 * Captures visitor IP, requested actions, response status, and security threats.
 * Forwards real-time events to the Python Security Monitor and writes to local audit log.
 */
import fs from "node:fs";
import path from "node:path";
import { recordSecurityEvent } from "../modules/security/security.store.js";

const LOGS_DIR = path.join(process.cwd(), "logs");
const AUDIT_FILE = path.join(LOGS_DIR, "security_audit.jsonl");

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Suspicious patterns to flag
const THREAT_PATTERNS = [
  ".env", "wp-admin", "wp-login", "phpmyadmin", "xmlrpc.php",
  "eval(", "union select", "1=1", "<script>", "/etc/passwd",
  "win.ini", "../", "..\\", "shell.php"
];

function detectThreat(url, userAgent, statusCode) {
  const urlLower = (url || "").toLowerCase();
  const uaLower = (userAgent || "").toLowerCase();

  for (const pattern of THREAT_PATTERNS) {
    if (urlLower.includes(pattern)) {
      return {
        level: "CRITICAL",
        details: `Попытка обращения к запрещенному ресурсу: '${pattern}'`
      };
    }
  }

  if (["sqlmap", "nikto", "nmap", "gobuster", "dirbuster"].some(t => uaLower.includes(t))) {
    return {
      level: "CRITICAL",
      details: `Обнаружен запуск сканера уязвимостей в User-Agent: '${userAgent}'`
    };
  }

  if (statusCode === 429) {
    return {
      level: "CRITICAL",
      details: "Обнаружена DoS / флуд-атака: превышен допустимый лимит запросов (Rate Limit 429)"
    };
  }

  if (statusCode === 401 && urlLower.includes("login")) {
    return { level: "WARNING", details: "Неуспешная попытка авторизации" };
  }

  if (statusCode >= 400 && [".php", ".asp", ".bak"].some(ext => urlLower.includes(ext))) {
    return { level: "WARNING", details: `Поиск серверных скриптов: ${url}` };
  }

  return { level: "NORMAL", details: "" };
}

function resolveAction(url, method, statusCode, req) {
  if (statusCode === 429) return "RATE_LIMIT_BLOCKED";

  const pathPart = url.split("?")[0].toLowerCase();
  const m = method.toUpperCase();
  const adminTag = req.user?.username ? ` [👤 ${req.user.username}]` : "";

  if (pathPart.includes("/auth/login")) {
    const userAttempt = req.body?.login || req.body?.username || "не указан";
    return statusCode === 200 
      ? `ADMIN_LOGIN_SUCCESS: ${userAttempt}` 
      : `ADMIN_LOGIN_FAILED: '${userAttempt}'`;
  }
  if (pathPart.includes("/auth/logout")) return `ADMIN_LOGOUT${adminTag}`;
  if (pathPart.includes("/auth/me")) return `ADMIN_AUTH_CHECK${adminTag}`;
  if (pathPart.includes("/auth/change-password")) return `ADMIN_CHANGE_PASSWORD${adminTag}`;

  if (pathPart.includes("/applications")) {
    if (m === "POST") {
      const p = req.body?.parentName || req.body?.name || "Родитель";
      const ph = req.body?.phone || req.body?.phoneNumber || "";
      return `SUBMIT_APPLICATION (${p}, ${ph})`;
    }
    return `ADMIN_VIEW_LEADS${adminTag}`;
  }

  if (pathPart.includes("/site/home") || pathPart === "/" || pathPart === "/api") {
    return "VIEW_HOMEPAGE";
  }

  if (pathPart.includes("/admin/pages")) return `ADMIN_EDIT_PAGES (${m})${adminTag}`;
  if (pathPart.includes("/admin/news")) return `ADMIN_MANAGE_NEWS (${m})${adminTag}`;
  if (pathPart.includes("/admin/media")) return `ADMIN_MANAGE_MEDIA (${m})${adminTag}`;
  if (pathPart.includes("/admin/applications")) return `ADMIN_VIEW_LEADS${adminTag}`;

  if (pathPart.includes("/news")) {
    if (m === "GET") return "VIEW_NEWS";
    if (m === "POST") return `ADMIN_CREATE_NEWS${adminTag}`;
    if (m === "PUT" || m === "PATCH") return `ADMIN_UPDATE_NEWS${adminTag}`;
    if (m === "DELETE") return `ADMIN_DELETE_NEWS${adminTag}`;
  }

  if (pathPart.includes("/media")) {
    return m === "POST" ? `ADMIN_UPLOAD_MEDIA${adminTag}` : `ADMIN_VIEW_MEDIA${adminTag}`;
  }

  return `${m} ${pathPart}`;
}

const floodLogThrottler = new Map(); // ip -> { count, lastLogged }

export function auditMiddleware(req, res, next) {
  const url = req.originalUrl || req.url || "";
  // Do not double-audit security tracker & sync endpoints
  if (url.includes("/api/security")) {
    return next();
  }

  const startTime = Date.now();

  // Extract client IP
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress ||
    "127.0.0.1"
  ).toString().split(",")[0].trim();

  // Hook into response finish to capture status code and timing
  res.on("finish", () => {
    const responseTimeMs = Date.now() - startTime;
    const statusCode = res.statusCode;
    const userAgent = req.headers["user-agent"] || "";
    const action = resolveAction(req.originalUrl || req.url, req.method, statusCode, req);
    const threat = detectThreat(req.originalUrl || req.url, userAgent, statusCode);

    // Throttle repeated 429 log spamming to prevent DoS against log storage
    if (statusCode === 429) {
      const rec = floodLogThrottler.get(ip) || { count: 0, lastLogged: 0 };
      rec.count += 1;
      const now = Date.now();
      if (rec.count > 1 && now - rec.lastLogged < 4000) {
        floodLogThrottler.set(ip, rec);
        return;
      }
      if (rec.count > 1) {
        threat.details += ` (заблокировано уже ${rec.count} попыток подряд)`;
      }
      rec.lastLogged = now;
      floodLogThrottler.set(ip, rec);
    }

    // Capture extra rich metadata
    const referrer = req.headers["referer"] || req.headers["referrer"] || "";
    const country = req.headers["cf-ipcountry"] || req.headers["x-country"] || "";
    
    let details = threat.details;
    if (action.startsWith("ADMIN_LOGIN_SUCCESS")) {
      details = `Успешный вход в панель управления. IP: ${ip}`;
    } else if (action.startsWith("ADMIN_LOGIN_FAILED")) {
      threat.level = "WARNING";
      details = `Ошибка входа: неверный логин или пароль ('${req.body?.login || req.body?.username}')`;
    } else if (action.startsWith("SUBMIT_APPLICATION")) {
      const p = req.body?.parentName || req.body?.name || "";
      const ph = req.body?.phone || req.body?.phoneNumber || "";
      const gr = req.body?.grade || req.body?.classNumber || "";
      details = `Подана заявка: ${p}, тел: ${ph}, класс: ${gr}`;
    }

    if (referrer && !details.includes("Реферер")) {
      details += details ? ` | Источник: ${referrer}` : `Источник: ${referrer}`;
    }
    if (country && !details.includes("Страна")) {
      details += details ? ` | Страна: ${country}` : `Страна: ${country}`;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      ip,
      method: req.method,
      endpoint: req.originalUrl || req.url,
      action,
      statusCode,
      responseTimeMs,
      userAgent,
      threatLevel: threat.level,
      threatDetails: details.trim()
    };

    // 1. Record to internal memory store & audit log for Python sync
    recordSecurityEvent(logEntry);

    // 2. Direct forward to Python Security Monitor (if running locally)
    const pythonEndpoint = "http://127.0.0.1:8080/api/log";
    fetch(pythonEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry),
      signal: AbortSignal.timeout(1500)
    }).catch(() => {});
  });

  next();
}
