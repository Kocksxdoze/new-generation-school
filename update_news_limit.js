import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateNewsLimit() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!page) return;

  const newsSection = await prisma.section.findFirst({
    where: { pageId: page.id, type: 'news' }
  });

  if (newsSection) {
    const data = JSON.parse(newsSection.data);
    data.limit = 3;
    await prisma.section.update({
      where: { id: newsSection.id },
      data: { data: JSON.stringify(data) }
    });
    console.log("News section updated to limit 3!");
  }
}

updateNewsLimit().catch(console.error).finally(() => prisma.$disconnect());
