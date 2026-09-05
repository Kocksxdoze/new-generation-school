import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function revertAdmissionToLocation() {
  console.log("Fetching home page...");
  const page = await prisma.page.findUnique({ where: { slug: 'home' } });
  
  if (!page) {
    console.log("Home page not found");
    return;
  }

  console.log("Deleting admission section...");
  await prisma.section.deleteMany({
    where: { 
      pageId: page.id,
      type: 'admission'
    }
  });
  
  // also delete old location if it somehow exists
  await prisma.section.deleteMany({
    where: { 
      pageId: page.id,
      type: 'location'
    }
  });

  console.log("Creating location section...");
  await prisma.section.create({
    data: {
      pageId: page.id,
      type: 'location',
      order: 8,
      visible: true,
      data: JSON.stringify({
        title: "Ждем вас в гости",
        address: "ул. Мукинат, 103, Фергана",
        lat: 40.3833,
        lng: 71.7833
      })
    }
  });

  console.log("Done!");
}

revertAdmissionToLocation().catch(console.error).finally(() => prisma.$disconnect());
