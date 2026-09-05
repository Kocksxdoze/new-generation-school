import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

// Reads the JWT from the httpOnly cookie (browser admin panel) or from the
// Authorization header (useful for scripts/Postman), verifies it, and
// attaches the decoded payload to req.user.
export function requireAuth(req, res, next) {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  const token = req.cookies?.[env.jwt.cookieName] ?? bearer;

  if (!token) {
    throw ApiError.unauthorized();
  }

  try {
    req.user = jwt.verify(token, env.jwt.secret);
    next();
  } catch {
    throw ApiError.unauthorized("Сессия истекла, войдите снова");
  }
}

// Usage: requireRole("ADMIN") — call after requireAuth.
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden();
    }
    next();
  };
}
