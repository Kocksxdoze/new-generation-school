import { PrismaClient } from "@prisma/client";
import { env } from "./env.js";

// A single shared Prisma instance for the whole app — avoids exhausting
// SQLite connections by creating a new client per request/module.
export const prisma = new PrismaClient({
  log: env.isProduction ? ["error", "warn"] : ["query", "error", "warn"],
});
