import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding Teachers...");
  const teachersCount = await prisma.teacher.count();
  if (teachersCount === 0) {
    const teachers = [
      {
        name: "Галина Алексеевна",
        subject: "Руководство школы",
        role: "Учредитель и директор школы",
        desc: "Учредитель и директор школы НОУ «Новое Поколение», лидер развития образования с 25-летним стажем руководства образовательными проектами.",
        department: "leadership",
        imageUrl: "/images/teachers/galina.jpg",
        order: 1,
      },
      {
        name: "Диляфруз Ганиевна",
        subject: "Математика и логика",
        role: "Ведущий преподаватель математики",
        desc: "Ведущий преподаватель математики, подготовка к республиканским олимпиадам и международным экзаменам SAT / Cambridge Math.",
        department: "exact",
        imageUrl: "/images/teachers/dilafruz.jpg",
        order: 2,
      },
      {
        name: "Нигора Усмановна",
        subject: "Английский язык",
        role: "Зав. кафедры английского языка",
        desc: "Учитель и зав. кафедры английского языка, сертификация Cambridge Assessment English, подготовка к IELTS и TOEFL.",
        department: "languages",
        imageUrl: "/images/teachers/nigora.jpg",
        order: 3,
      },
      {
        name: "Альбина Николаевна",
        subject: "Начальные классы",
        role: "Классный руководитель младшей школы",
        desc: "Сильный преподаватель начального образования, индивидуальный подход, адаптационные методики и любовь к каждому ученику.",
        department: "primary",
        imageUrl: "/images/teachers/albina.jpg",
        order: 4,
      },
      {
        name: "Алишер Махмудович",
        subject: "Робототехника и IT",
        role: "Руководитель лаборатории робототехники",
        desc: "Тренер школьной сборной по робототехнике, практическое обучение Python, Arduino, C++ и 3D-моделированию.",
        department: "exact",
        imageUrl: "/images/programs/high.jpg",
        order: 5,
      },
      {
        name: "Елена Сергеевна",
        subject: "Русский язык и литература",
        role: "Учитель высшей категории",
        desc: "Эксперт в развитии критического мышления, ораторского мастерства и углубленного анализа мировой литературы.",
        department: "humanities",
        imageUrl: "/images/teachers/albina.jpg",
        order: 6,
      },
      {
        name: "Рустам Камилович",
        subject: "Физика и астрономия",
        role: "Преподаватель физики",
        desc: "Практические лабораторные эксперименты, олимпиадная физика и развитие инженерного склада ума у школьников.",
        department: "exact",
        imageUrl: "/images/programs/middle.jpg",
        order: 7,
      },
      {
        name: "Шахноза Баходировна",
        subject: "Химия и биология",
        role: "Зав. естественно-научной лабораторией",
        desc: "Интерактивная био-лаборатория, микроскопия, экологические проекты и победы на городских олимпиадах.",
        department: "exact",
        imageUrl: "/images/teachers/nigora.jpg",
        order: 8,
      },
      {
        name: "Зарина Тимуровна",
        subject: "Cambridge Primary",
        role: "Учитель билингвального цикла",
        desc: "Преподавание по международным программам начальной ступени, развитие soft-skills и исследовательской любознательности.",
        department: "primary",
        imageUrl: "/images/programs/primary.jpg",
        order: 9,
      },
      {
        name: "Фарход Искандарович",
        subject: "Физическая культура и спорт",
        role: "Мастер спорта, главный тренер",
        desc: "Организация секций по футболу, баскетболу, настольному теннису и шахматам. Воспитание командного духа и здоровья.",
        department: "sports",
        imageUrl: "/images/teachers/dilafruz.jpg",
        order: 10,
      },
    ];

    for (const t of teachers) {
      await prisma.teacher.create({ data: t });
    }
    console.log(`Created ${teachers.length} teachers!`);
  } else {
    console.log(`Teachers table already has ${teachersCount} records.`);
  }

  console.log("Seeding Gallery Items...");
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    const galleryItems = [
      {
        title: "Современные IT и робототехнические лаборатории",
        caption: "Практические занятия по программированию, электронике и сборке автономных роботов.",
        type: "image",
        url: "/images/programs/high.jpg",
        category: "labs",
        featured: true,
        order: 1,
      },
      {
        title: "Научная лаборатория физики и биологии",
        caption: "Настоящие микроскопы, реактивы и исследовательское оборудование для юных ученых.",
        type: "image",
        url: "/images/programs/middle.jpg",
        category: "labs",
        featured: true,
        order: 2,
      },
      {
        title: "Светлые и интерактивные классы начальной школы",
        caption: "Эргономичная мебель, интерактивные доски и комфортная атмосфера для развития.",
        type: "image",
        url: "/images/programs/primary.jpg",
        category: "classrooms",
        featured: true,
        order: 3,
      },
      {
        title: "Развивающее пространство для дошколят",
        caption: "Зона Монтессори, развивающие логические игры и мягкая социализация перед 1 классом.",
        type: "image",
        url: "/images/programs/preschool.jpg",
        category: "classrooms",
        featured: true,
        order: 4,
      },
      {
        title: "Учебный процесс и презентации проектов",
        caption: "Ученики школы представляют свои научные исследования и стартап-идеи на школьном форуме.",
        type: "image",
        url: "/uploads/photo_2025-04-25_15-39-52_2.jpg",
        category: "events",
        featured: false,
        order: 5,
      },
      {
        title: "Спортивный комплекс и активный отдых",
        caption: "Просторный спортивный зал с безопасным покрытием, секции волейбола, гимнастики и мини-футбола.",
        type: "image",
        url: "/uploads/3_eoUwudV.jpg",
        category: "sports",
        featured: false,
        order: 6,
      },
      {
        title: "Главный кампус New Generation School",
        caption: "Безопасная охраняемая территория 24/7, зеленая зона отдыха и современная архитектура.",
        type: "image",
        url: "/uploads/bg.png",
        category: "campus",
        featured: true,
        order: 7,
      },
      {
        title: "Видео-экскурсия по инновационному кампусу",
        caption: "Погрузитесь в атмосферу школы: лаборатории, спортивные зоны, классы и библиотека.",
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-students-studying-in-a-classroom-42654-large.mp4",
        category: "campus",
        featured: true,
        order: 8,
      },
      {
        title: "Лабораторная работа: робототехника в действии",
        caption: "Наши старшеклассники тестируют алгоритмы компьютерного зрения на робототехнической платформе.",
        type: "video",
        url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-typing-on-a-laptop-keyboard-41386-large.mp4",
        category: "labs",
        featured: false,
        order: 9,
      },
    ];

    for (const g of galleryItems) {
      await prisma.galleryItem.create({ data: g });
    }
    console.log(`Created ${galleryItems.length} gallery items!`);
  } else {
    console.log(`Gallery table already has ${galleryCount} records.`);
  }
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
