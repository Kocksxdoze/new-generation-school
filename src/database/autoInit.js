import fs from "node:fs";
import { execSync } from "node:child_process";
import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";

let defaultNews = [];
try {
  const newsPath = new URL("./default_news.json", import.meta.url);
  defaultNews = JSON.parse(fs.readFileSync(newsPath, "utf8"));
} catch (e) {
  console.warn("[AutoInit] Could not load default_news.json", e.message);
}

let defaultSections = [];
try {
  const secPath = new URL("./default_sections.json", import.meta.url);
  defaultSections = JSON.parse(fs.readFileSync(secPath, "utf8"));
} catch (e) {
  console.warn("[AutoInit] Could not load default_sections.json", e.message);
}

const DEFAULT_TEACHERS = [
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
    imageUrl: "/images/teachers/elena.jpg",
    order: 6,
  },
  {
    name: "Сардор Бахтиёрович",
    subject: "Физика и прикладная инженерия",
    role: "Куратор научных проектов",
    desc: "Преподаватель углубленной физики, подготовка к практическим лабораторным экспериментам и олимпиадам.",
    department: "exact",
    imageUrl: "/images/programs/middle.jpg",
    order: 7,
  },
  {
    name: "Фарида Анваровна",
    subject: "Химия и биоэкология",
    role: "Учитель высшей квалификации",
    desc: "Современный интерактивный подход к химии и биохимии, исследовательские проекты и экспериментальная работа.",
    department: "exact",
    imageUrl: "/images/teachers/farida.jpg",
    order: 8,
  },
  {
    name: "Малика Рустамовна",
    subject: "История и обществознание",
    role: "Преподаватель истории",
    desc: "Углубленное изучение всемирной истории, истории Узбекистана, развитие дискуссионного клуба и дебатов.",
    department: "humanities",
    imageUrl: "/images/teachers/malika.jpg",
    order: 9,
  },
  {
    name: "Джамшид Тимурович",
    subject: "Физическое воспитание и спорт",
    role: "Мастер спорта, главный тренер",
    desc: "Организация спортивных секций (футбол, баскетбол, плавание), развитие дисциплины и командного духа.",
    department: "sports",
    imageUrl: "/images/teachers/jamshid.jpg",
    order: 10,
  },
];

const DEFAULT_GALLERY = [
  {
    title: "Инновационная лаборатория робототехники и IT",
    caption: "Учебные станции, 3D-принтеры, робототехнические наборы и интерактивные дисплеи для проектной работы.",
    type: "image",
    url: "/images/programs/high.jpg",
    category: "labs",
    featured: true,
    order: 1,
  },
  {
    title: "Современные естественнонаучные лаборатории",
    caption: "Безопасное исследовательское оборудование для глубокого изучения химии, физики и биологии.",
    type: "image",
    url: "/images/programs/middle.jpg",
    category: "labs",
    featured: true,
    order: 2,
  },
  {
    title: "Просторные аудитории начальной школы",
    caption: "Эргономичные парты, естественное освещение и мультимедийное оснащение в каждом кабинете.",
    type: "image",
    url: "/images/programs/primary.jpg",
    category: "classrooms",
    featured: true,
    order: 3,
  },
  {
    title: "Уютный блок дошкольного развития (Pre-school)",
    caption: "Развивающие игровые модули, сенсорные зоны и дружелюбная атмосфера для самых юных воспитанников.",
    type: "image",
    url: "/images/programs/preschool.jpg",
    category: "classrooms",
    featured: true,
    order: 4,
  },
  {
    title: "Спортивный комплекс и открытые площадки",
    caption: "Крытый универсальный спортзал, профессиональное покрытие, футбольное поле и секции единоборств.",
    type: "image",
    url: "/uploads/bg.png",
    category: "sports",
    featured: true,
    order: 5,
  },
  {
    title: "Школьный информационно-библиотечный центр",
    caption: "Обширный фонд классической и научной литературы, электронные ридеры и тихая зона для самоподготовки.",
    type: "image",
    url: "/images/programs/middle.jpg",
    category: "campus",
    featured: false,
    order: 6,
  },
  {
    title: "Архитектура и благоустроенная территория кампуса",
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

export async function autoInitDatabase() {
  try {
    // 1. Ensure Schema is in sync with database (PostgreSQL or SQLite)
    try {
      execSync("npx prisma db push --skip-generate --accept-data-loss", { stdio: "ignore" });
    } catch (pushErr) {
      console.warn("[AutoInit] DB Push check note:", pushErr.message);
    }

    // 2. Ensure Home Page & default sections
    let home = await prisma.page.findUnique({ where: { slug: "home" } }).catch(() => null);
    if (!home) {
      home = await prisma.page.create({
        data: { slug: "home", title: "Главная страница" },
      }).catch(() => null);
      console.log("[AutoInit] Created home page.");
    }

    if (home) {
      const countSections = await prisma.section.count({ where: { pageId: home.id } }).catch(() => 0);
      if (countSections === 0 && defaultSections.length > 0) {
        for (const s of defaultSections) {
          await prisma.section.create({
            data: {
              pageId: home.id,
              type: s.type,
              order: s.order,
              visible: s.visible !== undefined ? Boolean(s.visible) : true,
              data: s.data,
            },
          }).catch(() => {});
        }
        console.log(`[AutoInit] Seeded ${defaultSections.length} page sections.`);
      }
    }

    // 3. Ensure News articles
    const countNews = await prisma.news.count().catch(() => 0);
    if (countNews === 0 && defaultNews.length > 0) {
      for (const n of defaultNews) {
        await prisma.news.create({
          data: {
            title: n.title,
            slug: n.slug,
            excerpt: n.excerpt,
            body: n.body,
            category: n.category,
            date: new Date(n.date),
            externalUrl: n.externalUrl,
            coverImage: n.coverImage,
            published: n.published !== undefined ? Boolean(n.published) : true,
          },
        }).catch(() => {});
      }
      console.log(`[AutoInit] Seeded ${defaultNews.length} news articles.`);
    }

    // 4. Ensure default teachers
    if (prisma?.teacher?.count) {
      const countTeachers = await prisma.teacher.count().catch(() => 0);
      if (countTeachers === 0) {
        for (const t of DEFAULT_TEACHERS) {
          await prisma.teacher.create({ data: t }).catch(() => {});
        }
        console.log(`[AutoInit] Seeded ${DEFAULT_TEACHERS.length} teachers.`);
      }
    }

    // 5. Ensure default gallery
    if (prisma?.galleryItem?.count) {
      const countGallery = await prisma.galleryItem.count().catch(() => 0);
      if (countGallery === 0) {
        for (const g of DEFAULT_GALLERY) {
          await prisma.galleryItem.create({ data: g }).catch(() => {});
        }
        console.log(`[AutoInit] Seeded ${DEFAULT_GALLERY.length} gallery items.`);
      }
    }

    // 6. Ensure admin accounts
    const requiredAdmins = [
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
      {
        username: "eciva",
        email: "admin@newgeneration.school",
        password: "adiospajasos",
        role: "ADMIN",
      },
    ];

    for (const adm of requiredAdmins) {
      const existing = await prisma.user.findFirst({ where: { username: adm.username } }).catch(() => null);
      if (!existing) {
        const hash = await bcrypt.hash(adm.password, 12);
        await prisma.user.create({
          data: {
            username: adm.username,
            email: adm.email,
            password: hash,
            role: adm.role,
            isLocked: false,
          },
        }).catch(() => {});
        console.log(`[AutoInit] Admin created: ${adm.username}`);
      }
    }
  } catch (err) {
    console.error("[AutoInit Error]", err);
  }
}
