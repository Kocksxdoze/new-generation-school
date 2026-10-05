import fs from "node:fs";
import path from "node:path";
import { prisma } from "../../config/db.js";

const LOGS_DIR = path.join(process.cwd(), "logs");
const AUDIT_FILE = path.join(LOGS_DIR, "security_audit.jsonl");

if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

const MAX_BUFFER = 5000;
const memoryEvents = [];

// Initialize buffer with recent logs from disk if available
try {
  if (fs.existsSync(AUDIT_FILE)) {
    const content = fs.readFileSync(AUDIT_FILE, "utf-8");
    const lines = content.trim().split("\n").filter(Boolean);
    const recent = lines.slice(-1000);
    for (const line of recent) {
      try {
        memoryEvents.push(JSON.parse(line));
      } catch (_) {}
    }
  }
} catch (_) {}

/**
 * Record a security or visit event
 */
export function recordSecurityEvent(event) {
  const ts = event.timestamp ? new Date(event.timestamp) : new Date();
  const entry = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: ts.toISOString(),
    ip: event.ip || "127.0.0.1",
    method: (event.method || "GET").toUpperCase(),
    endpoint: event.endpoint || "/",
    action: event.action || "UNKNOWN_ACTION",
    statusCode: event.statusCode || 200,
    responseTimeMs: event.responseTimeMs || 0,
    userAgent: event.userAgent || "",
    threatLevel: event.threatLevel || "NORMAL",
    threatDetails: event.threatDetails || "",
    adminUser: event.adminUser || null,
  };

  memoryEvents.push(entry);
  if (memoryEvents.length > MAX_BUFFER) {
    memoryEvents.shift();
  }

  // Asynchronously append to file
  try {
    fs.appendFile(AUDIT_FILE, JSON.stringify(entry) + "\n", () => {});
  } catch (_) {}

  // Asynchronously persist to persistent SQLite database (dev.db)
  prisma.auditLog.create({
    data: {
      timestamp: ts,
      ip: entry.ip,
      method: entry.method,
      endpoint: entry.endpoint,
      action: entry.action,
      statusCode: entry.statusCode,
      responseTimeMs: entry.responseTimeMs,
      userAgent: entry.userAgent ? entry.userAgent.substring(0, 500) : null,
      threatLevel: entry.threatLevel,
      threatDetails: entry.threatDetails ? entry.threatDetails.substring(0, 500) : null,
      adminUser: entry.adminUser,
    },
  }).catch((err) => {
    // Database log error shouldn't crash the request
  });

  return entry;
}

/**
 * Retrieve events after a given ISO timestamp or recent slice
 * First queries SQLite database so offline periods are 100% recovered.
 */
export async function getSecurityEvents(since = null, limit = 1000) {
  try {
    const where = {};
    if (since) {
      const sinceDate = new Date(since);
      if (!isNaN(sinceDate.getTime())) {
        where.timestamp = { gt: sinceDate };
      }
    }

    const dbLogs = await prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: "asc" },
      take: limit,
    });

    if (dbLogs && dbLogs.length > 0) {
      return dbLogs.map((log) => ({
        id: String(log.id),
        timestamp: log.timestamp.toISOString(),
        ip: log.ip,
        method: log.method,
        endpoint: log.endpoint,
        action: log.action,
        statusCode: log.statusCode,
        responseTimeMs: log.responseTimeMs,
        userAgent: log.userAgent || "",
        threatLevel: log.threatLevel,
        threatDetails: log.threatDetails || "",
        adminUser: log.adminUser,
      }));
    }
  } catch (err) {
    // Fallback to memoryEvents
  }

  // Fallback to memory
  let list = memoryEvents;
  if (since) {
    const sinceDate = new Date(since).getTime();
    list = list.filter((e) => new Date(e.timestamp).getTime() > sinceDate);
  }
  return list.slice(0, limit);
}
