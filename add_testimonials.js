import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addTestimonials() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!page) return;

  // Shift orders
  await prisma.section.updateMany({
    where: { pageId: page.id, order: { gte: 7 } },
    data: { order: { increment: 1 } } // wait, prisma might not support increment this way if we want to do it safely, better to update one by one
  });

  const news = await prisma.section.findFirst({ where: { pageId: page.id, type: 'news' }});
  if (news) {
    await prisma.section.update({ where: { id: news.id }, data: { order: 8 }});
  }
  const location = await prisma.section.findFirst({ where: { pageId: page.id, type: 'location' }});
  if (location) {
    await prisma.section.update({ where: { id: location.id }, data: { order: 9 }});
  }

  // Create testimonials
  await prisma.section.deleteMany({ where: { pageId: page.id, type: 'testimonials' } });
  
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'testimonials',
      order: 7,
      visible: true,
      data: JSON.stringify({
        subtitle: "Отзывы",
        titleHtml: "Слова родителей <br />\n<span style=\"font-size: 1.875rem; font-weight: 500; color: #64748B;\">ключ к счастливым детям.</span>",
        items: [
          {
            name: "Марина К.",
            role: "Мама ученика 5 класса",
            text: "Мы искали школу, где ребенок будет не только получать знания, но и с радостью идти на уроки. NGS превзошла все ожидания!",
            variant: "light",
            avatarLetter: "М",
            avatarBg: "blue.50",
            avatarColor: "blue.600"
          },
          {
            name: "Рустам А.",
            role: "Папа выпускницы",
            text: "Благодаря сильной подготовке дочь поступила в топовый вуз на грант. Огромное спасибо всему преподавательскому составу.",
            variant: "dark",
            avatarLetter: "Р",
            avatarBg: "#fdbb31",
            avatarColor: "black"
          },
          {
            name: "Дильдора У.",
            role: "Мама ученицы 2 класса",
            text: "Очень нравится современный подход и то, как преподаватели общаются с детьми. Ребенок стал более открытым и самостоятельным.",
            variant: "light",
            avatarLetter: "Д",
            avatarBg: "green.50",
            avatarColor: "green.600"
          }
        ]
      })
    }
  });

  console.log("Testimonials added!");
}

addTestimonials().catch(console.error).finally(() => prisma.$disconnect());
