import fs from "node:fs";
import path from "node:path";
import "dotenv/config";

const dbUrl = process.env.DATABASE_URL || "";
const isExplicitSqlite = dbUrl.startsWith("file:") || dbUrl.startsWith("sqlite:");
const targetProvider = isExplicitSqlite ? "sqlite" : "postgresql";

const schemaPath = path.resolve(process.cwd(), "prisma", "schema.prisma");
if (fs.existsSync(schemaPath)) {
  let content = fs.readFileSync(schemaPath, "utf8");
  const currentMatch = content.match(/provider\s*=\s*"(sqlite|postgresql)"/);
  const currentProvider = currentMatch ? currentMatch[1] : null;

  if (currentProvider !== targetProvider) {
    content = content.replace(/provider\s*=\s*"(sqlite|postgresql)"/, `provider = "${targetProvider}"`);
    fs.writeFileSync(schemaPath, content, "utf8");
    console.log(`[Prisma Prep] Switched provider from "${currentProvider}" to "${targetProvider}"`);
  } else {
    console.log(`[Prisma Prep] Provider already configured as "${targetProvider}"`);
  }
}
