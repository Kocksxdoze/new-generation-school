import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateAlumniLogos() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  
  if (!page) {
    console.log("Home page not found");
    return;
  }

  const alumniSection = await prisma.section.findFirst({
    where: { pageId: page.id, type: 'alumni' }
  });

  if (alumniSection) {
    const data = JSON.parse(alumniSection.data);
    data.logos = [
      { name: "WIUT", city: "Ташкент", bg: "blue.500", type: "text", label: "W", iconColor: "white" },
      { name: "MDIS", city: "Сингапур / Ташкент", bg: "red.500", type: "text", label: "M", iconColor: "white" },
      { name: "INHA", city: "Южная Корея / Ташкент", bg: "cyan.500", type: "text", label: "I", iconColor: "white" },
      { name: "KIMEP", city: "Казахстан", bg: "purple.500", type: "text", label: "K", iconColor: "white" },
      { name: "BUC", city: "Лондон / Ташкент", bg: "green.500", type: "icon", label: "account_balance", iconColor: "white" },
      { name: "TPU", city: "Россия", bg: "orange.500", type: "icon", label: "account_balance", iconColor: "white" }
    ];
    await prisma.section.update({
      where: { id: alumniSection.id },
      data: { data: JSON.stringify(data) }
    });
    console.log("Alumni section updated!");
  }
}

updateAlumniLogos().catch(console.error).finally(() => prisma.$disconnect());
