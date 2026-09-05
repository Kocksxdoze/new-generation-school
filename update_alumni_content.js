import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function updateAlumniContent() {
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  if (!page) return;

  const alumniSection = await prisma.section.findFirst({
    where: { pageId: page.id, type: 'alumni' }
  });

  if (alumniSection) {
    const data = JSON.parse(alumniSection.data);
    data.logos = [
      { name: "Harvard", city: "США", bg: "red.800", type: "text", label: "H", iconColor: "white" },
      { name: "Oxford", city: "Великобритания", bg: "blue.800", type: "text", label: "O", iconColor: "white" },
      { name: "Stanford", city: "США", bg: "red.600", type: "text", label: "S", iconColor: "white" },
      { name: "Cambridge", city: "Великобритания", bg: "cyan.600", type: "text", label: "C", iconColor: "white" },
      { name: "MIT", city: "США", bg: "gray.700", type: "text", label: "M", iconColor: "white" },
      { name: "Yale", city: "США", bg: "blue.600", type: "text", label: "Y", iconColor: "white" }
    ];
    data.reviews = [
      {
        text: "Школа дала мне не только знания, но и уверенность в себе. Поддержка учителей и атмосфера здесь помогли мне поступить в университет моей мечты.",
        name: "Собир Рахимов",
        desc: "Выпуск 2024, University of Oxford",
        imageUrl: "/uploads/bg.png"
      },
      {
        text: "Благодаря проектной работе и командным кейсам я научилась мыслить шире и работать в команде. Это бесценно.",
        name: "Мадина Юсупова",
        desc: "Выпуск 2023, Harvard University",
        imageUrl: "/uploads/bg.png"
      },
      {
        text: "Глубокие знания по математике и программированию позволили мне без труда пройти вступительные экзамены.",
        name: "Алишер Каримов",
        desc: "Выпуск 2022, MIT",
        imageUrl: "/uploads/bg.png"
      }
    ];
    await prisma.section.update({
      where: { id: alumniSection.id },
      data: { data: JSON.stringify(data) }
    });
    console.log("Alumni section updated with prestigious universities and extra reviews!");
  }
}

updateAlumniContent().catch(console.error).finally(() => prisma.$disconnect());
