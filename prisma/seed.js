import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const { SEED_ADMIN_USERNAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } = process.env;

  if (!SEED_ADMIN_PASSWORD) {
    console.log("ℹ SEED_ADMIN_PASSWORD not set in .env — skipping admin user creation.");
  } else {
    const existing = await prisma.user.findUnique({ where: { username: SEED_ADMIN_USERNAME } });
    if (existing) {
      console.log(`ℹ Admin user "${SEED_ADMIN_USERNAME}" already exists — skipping.`);
    } else {
      const hashed = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
      await prisma.user.create({
        data: {
          username: SEED_ADMIN_USERNAME,
          email: SEED_ADMIN_EMAIL,
          password: hashed,
          role: "ADMIN",
        },
      });
      console.log(`✔ Created admin user "${SEED_ADMIN_USERNAME}"`);
    }
  }

  const home = await prisma.page.upsert({
    where: { slug: "home" },
    update: {},
    create: { slug: "home", title: "Главная страница" },
  });
  console.log(`✔ Ensured "${home.slug}" page exists`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
