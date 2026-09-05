import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateHeroVideo() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!page) return;

  const heroSection = await prisma.section.findFirst({
    where: { pageId: page.id, type: 'hero' }
  });

  if (heroSection) {
    const data = JSON.parse(heroSection.data);
    data.imageUrl = "/uploads/back.mp4"; // using imageUrl field to store video URL
    await prisma.section.update({
      where: { id: heroSection.id },
      data: { data: JSON.stringify(data) }
    });
    console.log("Hero section video updated!");
  }
}

updateHeroVideo().catch(console.error).finally(() => prisma.$disconnect());
