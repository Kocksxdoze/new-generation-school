/**
 * Security Audit & Visit Tracker Middleware for NGS Backend.
 * Captures visitor IP, requested actions, response status, and security threats.
 * Forwards real-time events to the Python Security Monitor and writes to local audit log.
 */
import fs from "node:fs";
import path from "node:path";

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

  if (statusCode === 401 && urlLower.includes("login")) {
    return { level: "WARNING", details: "Неуспешная попытка авторизации" };
  }

  if (statusCode >= 400 && [".php", ".asp", ".bak"].some(ext => urlLower.includes(ext))) {
    return { level: "WARNING", details: `Поиск серверных скриптов: ${url}` };
  }

  return { level: "NORMAL", details: "" };
}

function resolveAction(url, method, statusCode) {
  const pathPart = url.split("?")[0].toLowerCase();
  const m = method.toUpperCase();

  if (pathPart.includes("/auth/login")) {
    return statusCode === 200 ? "LOGIN_SUCCESS" : "LOGIN_FAILED";
  }
  if (pathPart.includes("/auth/logout")) return "LOGOUT";
  if (pathPart.includes("/auth/me")) return "AUTH_CHECK";

  if (pathPart.includes("/applications")) {
    return m === "POST" ? "SUBMIT_APPLICATION" : "ADMIN_VIEW_LEADS";
  }

  if (pathPart.includes("/site/home") || pathPart === "/" || pathPart === "/api") {
    return "VIEW_HOMEPAGE";
  }

  if (pathPart.includes("/news")) {
    if (m === "GET") return "VIEW_NEWS";
    if (m === "POST") return "ADMIN_CREATE_NEWS";
    if (m === "PUT" || m === "PATCH") return "ADMIN_UPDATE_NEWS";
    if (m === "DELETE") return "ADMIN_DELETE_NEWS";
  }

  if (pathPart.includes("/media")) {
    return m === "POST" ? "ADMIN_UPLOAD_MEDIA" : "ADMIN_VIEW_MEDIA";
  }

  if (pathPart.includes("/admin/pages")) return "ADMIN_EDIT_PAGES";

  return `${m} ${pathPart}`;
}

export function auditMiddleware(req, res, next) {
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
    const action = resolveAction(req.originalUrl || req.url, req.method, statusCode);
    const threat = detectThreat(req.originalUrl || req.url, userAgent, statusCode);

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
      threatDetails: threat.details
    };

    // 1. Write to local fallback file asynchronously
    try {
      fs.appendFile(AUDIT_FILE, JSON.stringify(logEntry) + "\n", () => {});
    } catch (e) {
      // Ignore file write errors
    }

    // 2. Asynchronously forward to Python Security Monitor (port 8080)
    // Non-blocking fire-and-forget
    const pythonEndpoint = "http://127.0.0.1:8080/api/log";
    fetch(pythonEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry),
      signal: AbortSignal.timeout(1500) // 1.5s timeout so it never hangs
    }).catch(() => {
      // Python monitor might be currently offline, ignore safely
    });
  });

  next();
}
