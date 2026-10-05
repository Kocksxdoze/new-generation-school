import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const usersToCreate = [
    {
      username: "boburenforce",
      email: "boburenforce@ngs.uz",
      password: "fKSJN#*7324&@(@fjskksl!#$@00",
      role: "ADMIN",
    },
    {
      username: "its_sens",
      email: "its_sens@ngs.uz",
      password: "Jjs&#*@($@#dscn124bk24blj&*@#GRF@ND",
      role: "ADMIN",
    },
  ];

  for (const u of usersToCreate) {
    const hashed = await bcrypt.hash(u.password, 12);
    const user = await prisma.user.upsert({
      where: { username: u.username },
      update: {
        password: hashed,
        role: u.role,
        isLocked: false,
      },
      create: {
        username: u.username,
        email: u.email,
        password: hashed,
        role: u.role,
        isLocked: false,
      },
    });
    console.log(`[USER_CREATED_OR_UPDATED] ${user.username} (id: ${user.id}, role: ${user.role})`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
