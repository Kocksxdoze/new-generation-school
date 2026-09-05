import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("pass", 12);

  // Замените 'ваш_логин' на реальный username или email
  const updated = await prisma.user.updateMany({
    where: {
      OR: [{ username: "usr" }, { email: "mail" }],
    },
    data: { password: hashedPassword },
  });

  console.log("Обновлено записей:", updated.count);
  console.log("Новый хэш:", hashedPassword);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
