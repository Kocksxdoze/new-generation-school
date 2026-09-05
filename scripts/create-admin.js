// Interactive-ish CLI for creating admin panel accounts without exposing a
// public registration endpoint. Usage:
//   npm run admin:create -- --username=jane --email=jane@ngs.uz --password=secret123 --role=ADMIN
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function parseArgs() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, ...rest] = arg.replace(/^--/, "").split("=");
      return [key, rest.join("=")];
    }),
  );
  return args;
}

async function main() {
  const { username, email, password, role = "ADMIN" } = parseArgs();

  if (!username || !email || !password) {
    console.error(
      "Usage: npm run admin:create -- --username=NAME --email=EMAIL --password=PASSWORD [--role=ADMIN|EDITOR]",
    );
    process.exitCode = 1;
    return;
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exitCode = 1;
    return;
  }

  const existing = await prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
  if (existing) {
    console.error(`A user with that username or email already exists (id: ${existing.id}).`);
    process.exitCode = 1;
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { username, email, password: hashed, role },
  });

  console.log(`✔ Created ${user.role} user "${user.username}" (id: ${user.id})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
