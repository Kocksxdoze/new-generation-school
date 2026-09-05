import "dotenv/config";

// All environment access goes through this file. If something required is
// missing, we fail fast at boot instead of crashing later mid-request.

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT ?? 4000),

  corsOrigins: (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),

  jwt: {
    secret: required("JWT_SECRET"),
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    cookieName: process.env.COOKIE_NAME ?? "ngs_token",
  },

  seedAdmin: {
    username: process.env.SEED_ADMIN_USERNAME ?? "admin",
    email: process.env.SEED_ADMIN_EMAIL ?? "admin@newgeneration.school",
    password: process.env.SEED_ADMIN_PASSWORD,
  },

  uploads: {
    dir: process.env.UPLOAD_DIR ?? "uploads",
    maxSizeBytes: Number(process.env.MAX_UPLOAD_SIZE_MB ?? 8) * 1024 * 1024,
  },
};
