import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

const DEFAULT_POSTGRES = "postgresql://ngs_owner:npg_ghMCF09yDOcG@ep-still-king-b4hj5zyh-pooler.c-6.us-east-2.aws.neon.tech/ngs?sslmode=require";

let connectionUrl = process.env.DATABASE_URL;
if (!connectionUrl || connectionUrl.startsWith("file:")) {
  connectionUrl = DEFAULT_POSTGRES;
}

// A single shared Prisma instance connected to permanent cloud PostgreSQL (Neon)
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: connectionUrl,
    },
  },
  log: env.isProduction ? ["error", "warn"] : ["query", "error", "warn"],
});
