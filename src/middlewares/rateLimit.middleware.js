/**
 * In-memory sliding-window rate limiter middleware for DDoS & Brute-force protection.
 * Protects against credential stuffing and application form spam.
 */

class MemoryRateLimiter {
  constructor(windowMs, maxRequests, message) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.message = message || "Слишком много запросов с вашего IP-адреса. Пожалуйста, повторите попытку позже.";
    this.hits = new Map(); // ip -> [timestamps]

    // Periodic cleanup of stale entries every 2 minutes
    const timer = setInterval(() => this.cleanup(), 2 * 60 * 1000);
    if (timer && timer.unref) timer.unref();
  }

  cleanup() {
    const now = Date.now();
    for (const [ip, timestamps] of this.hits.entries()) {
      const active = timestamps.filter(t => now - t < this.windowMs);
      if (active.length === 0) {
        this.hits.delete(ip);
      } else {
        this.hits.set(ip, active);
      }
    }
  }

  middleware() {
    return (req, res, next) => {
      // Extract client IP address safely
      const ip = (
        req.headers["x-forwarded-for"] ||
        req.headers["x-real-ip"] ||
        req.socket.remoteAddress ||
        "127.0.0.1"
      ).toString().split(",")[0].trim();

      const now = Date.now();
      const timestamps = this.hits.get(ip) || [];
      const windowStart = now - this.windowMs;

      // Filter timestamps within current sliding window
      const recent = timestamps.filter(t => t > windowStart);

      if (recent.length >= this.maxRequests) {
        res.setHeader("Retry-After", Math.ceil(this.windowMs / 1000));
        return res.status(429).json({
          success: false,
          error: "TOO_MANY_REQUESTS",
          message: this.message,
        });
      }

      recent.push(now);
      this.hits.set(ip, recent);
      next();
    };
  }
}

// 1. Login Brute-force protection: max 5 login attempts per 1 minute
export const authRateLimiter = new MemoryRateLimiter(
  60 * 1000, 
  5, 
  "Слишком много попыток авторизации. Доступ временно заблокирован на 1 минуту."
).middleware();

// 2. Lead/Application spam protection: max 5 leads per 10 minutes
export const applicationRateLimiter = new MemoryRateLimiter(
  10 * 60 * 1000, 
  5, 
  "Лимит отправки заявок превышен. Пожалуйста, подождите несколько минут."
).middleware();

// 3. General API flood protection: max 150 requests per minute
export const generalApiLimiter = new MemoryRateLimiter(
  60 * 1000, 
  150, 
  "Превышен общий лимит запросов к API."
).middleware();
