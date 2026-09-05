import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateHeroImage() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!page) return;

  const heroSection = await prisma.section.findFirst({
    where: { pageId: page.id, type: 'hero' }
  });

  if (heroSection) {
    const data = JSON.parse(heroSection.data);
    data.imageUrl = "/uploads/hero_prestigious.jpg";
    await prisma.section.update({
      where: { id: heroSection.id },
      data: { data: JSON.stringify(data) }
    });
    console.log("Hero section image updated!");
  }
}

updateHeroImage().catch(console.error).finally(() => prisma.$disconnect());
