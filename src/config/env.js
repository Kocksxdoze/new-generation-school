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

  s3: {
    endpoint: process.env.AWS_ENDPOINT_URL_S3 || process.env.S3_ENDPOINT || "https://br-raspy-sound-b43ktbpw.storage.c-6.us-east-2.aws.neon.tech",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY_ID || "nak_live_4fb7755bf26b43cc9b3e2b5b95fc1209",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_ACCESS_KEY || "nsk_live_1dfb166b00a5c2e9bf93fcb3b97cdb5c63191abb73202e983aac3c67bde1a438",
    region: process.env.AWS_REGION || "us-east-2",
    bucket: process.env.S3_BUCKET || "uploads",
  },
};
