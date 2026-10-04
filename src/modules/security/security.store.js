import fs from "node:fs";
import path from "node:path";

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
  const entry = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: event.timestamp || new Date().toISOString(),
    ip: event.ip || "127.0.0.1",
    method: (event.method || "GET").toUpperCase(),
    endpoint: event.endpoint || "/",
    action: event.action || "UNKNOWN_ACTION",
    statusCode: event.statusCode || 200,
    responseTimeMs: event.responseTimeMs || 0,
    userAgent: event.userAgent || "",
    threatLevel: event.threatLevel || "NORMAL",
    threatDetails: event.threatDetails || "",
  };

  memoryEvents.push(entry);
  if (memoryEvents.length > MAX_BUFFER) {
    memoryEvents.shift();
  }

  try {
    fs.appendFile(AUDIT_FILE, JSON.stringify(entry) + "\n", () => {});
  } catch (_) {}

  return entry;
}

/**
 * Retrieve events after a given ISO timestamp or recent slice
 */
export function getSecurityEvents(since = null, limit = 500) {
  let list = memoryEvents;
  if (since) {
    const sinceDate = new Date(since).getTime();
    list = list.filter((e) => new Date(e.timestamp).getTime() > sinceDate);
  }
  return list.slice(-limit);
}
