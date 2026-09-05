import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedHome() {
  console.log("Fetching home page...");
  let page = await prisma.page.findUnique({ where: { slug: 'home' } });
  
  if (!page) {
    console.log("Creating home page...");
    page = await prisma.page.create({ data: { title: 'Главная', slug: 'home', isPublished: true } });
  }

  console.log("Deleting old sections...");
  await prisma.section.deleteMany({ where: { pageId: page.id } });

  const newSections = [
    {
      type: 'hero',
      order: 1,
      visible: true,
      data: JSON.stringify({
        badgeText: "NEW GENERATION SCHOOL · ФЕРГАНА",
        titleHtml: "Образование, которое <br />открывает больше <br />возможностей",
        description: "Современная школа полного цикла с сильным преподавательским составом, современной образовательной средой и индивидуальным подходом к развитию каждого ученика.",
        applyUrl: "#",
        videoUrl: "#",
        imageUrl: "/uploads/bg.png",
        stats: [
          { value: "15+", label: "лет успешной работы", icon: "workspace_premium" },
          { value: "40+", label: "квалифицированных преподавателей", icon: "school" },
          { value: "100%", label: "классы оснащены интерактивными панелями", icon: "tv" },
          { value: "95%", label: "выпускников поступают в вузы первого выбора", icon: "social_leaderboard" }
        ]
      })
    },
    {
      type: 'features',
      order: 2,
      visible: true,
      data: JSON.stringify({
        subtitle: "ПОЧЕМУ NEW GENERATION",
        title: "Школа, где образование работает на будущее",
        items: [
          { icon: "workspace_premium", title: "Высокие результаты", text: "Системная подготовка к экзаменам, олимпиадам и поступлению в ведущие университеты." },
          { icon: "architecture", title: "Современное обучение", text: "Цифровые инструменты и интерактивные технологии делают обучение более наглядным, эффективным и вовлекающим." },
          { icon: "extension", title: "Всестороннее развитие", text: "Помогаем ученикам развивать академические знания, критическое мышление, творчество и самостоятельность." },
          { icon: "verified_user", title: "Сильная образовательная среда", text: "Безопасное пространство, в котором ученики могут учиться, исследовать новое и раскрывать свои способности." }
        ]
      })
    },
    {
      type: 'programs',
      order: 3,
      visible: true,
      data: JSON.stringify({
        title: "Образование на каждом этапе развития",
        items: [
          { tag: "01", age: "3-6 лет", title: "Дошкольная подготовка", text: "Формируем интерес к знаниям, развиваем самостоятельность, коммуникацию и готовность к школе.", imageUrl: "/uploads/1_w91El1j.jpg" },
          { tag: "02", age: "1-4 классы", title: "Начальная школа", text: "Закладываем прочную академическую базу и формируем устойчивые навыки самостоятельного обучения.", imageUrl: "/uploads/1_9DRnJR0.jpg" },
          { tag: "03", age: "5-9 классы", title: "Средняя школа", text: "Углубляем знания, развиваем критическое мышление и помогаем ученику определить свои сильные стороны и интересы.", imageUrl: "/uploads/3_leXEOVP.jpg" },
          { tag: "04", age: "10-11 классы", title: "Старшая школа", text: "Готовим учеников к поступлению в ведущие университеты и осознанному выбору дальнейшего образовательного пути.", imageUrl: "/uploads/1_8CletkE.jpg" }
        ]
      })
    },
    {
      type: 'tech_results',
      order: 4,
      visible: true,
      data: JSON.stringify({
        techTitle: "Современная среда, которая усиливает обучение",
        techItems: [
          { icon: "tv", title: "Интерактивные панели", text: "Каждый класс оснащён современным сенсорным дисплеем на базе Windows." },
          { icon: "devices", title: "Цифровые ресурсы", text: "Ученики и преподаватели используют современные образовательные материалы и инструменты." },
          { icon: "group", title: "Интерактивное обучение", text: "Сложные темы становятся наглядными благодаря мультимедиа, визуализациям и совместной работе." },
          { icon: "analytics", title: "Индивидуальный подход", text: "Технологии помогают учитывать темп и особенности обучения каждого ученика." }
        ],
        resultsTitle: "Результаты, которыми мы гордимся",
        resultsItems: [
          { value: "100%", label: "выпускников поступают в университеты" },
          { value: "XX%", label: "получают гранты и стипендии" },
          { value: "XX+", label: "призовых мест на олимпиадах" },
          { value: "XX+", label: "международных сертификатов" }
        ]
      })
    },
    {
      type: 'teachers',
      order: 5,
      visible: true,
      data: JSON.stringify({
        title: "Сильные преподаватели. Сильные результаты.",
        items: [
          { name: "Даврон Абдуллаев", subject: "Математика", exp: "12 лет опыта", desc: "Тренер олимпиадных команд", imageUrl: "/uploads/bg.png" },
          { name: "Мария Иванова", subject: "Английский язык", exp: "IELTS 8.5", desc: "Международный сертификат CELTA, DELTA", imageUrl: "/uploads/bg.png" },
          { name: "Отабек Каримов", subject: "Физика", exp: "15 лет опыта", desc: "Подготовка к международным олимпиадам", imageUrl: "/uploads/bg.png" },
          { name: "Нигина Арслонова", subject: "Биология", exp: "10 лет опыта", desc: "Проектная и исследовательская деятельность", imageUrl: "/uploads/bg.png" }
        ]
      })
    },
    {
      type: 'alumni',
      order: 6,
      visible: true,
      data: JSON.stringify({
        title: "Следующий шаг начинается в школе",
        logos: [
          "/uploads/WIUT.png",
          "/uploads/MDIS.png",
          "/uploads/INHA.png",
          "/uploads/KIMEP.png"
        ],
        reviews: [
          { name: "Имя Фамилия", desc: "Родитель ученика, 7 класс", text: "«Для нашей семьи было важно найти школу, где ребёнку не просто дают знания, а помогают развиваться, становиться самостоятельнее и уверенно двигаться дальше.»", imageUrl: "/uploads/bg.png" },
          { name: "Собир Рахимов", desc: "Выпуск 2024", text: "Школа дала мне не только знания, но и уверенность в себе. Поддержка учителей и атмосфера здесь помогли мне поступить в университет моей мечты.", imageUrl: "/uploads/bg.png" }
        ]
      })
    },
    {
      type: 'news',
      order: 7,
      visible: true,
      data: JSON.stringify({
        title: "Больше, чем уроки",
        subtitle: "ЖИЗНЬ ШКОЛЫ",
        limit: 2
      })
    },
    {
      type: 'admission',
      order: 8,
      visible: true,
      data: JSON.stringify({
        title: "Хотите узнать больше о поступлении?",
        description: "Оставьте заявку — мы расскажем о программе обучения, условиях поступления и ответим на вопросы."
      })
    }
  ];

  console.log("Creating new sections...");
  for (const s of newSections) {
    await prisma.section.create({
      data: {
        pageId: page.id,
        type: s.type,
        order: s.order,
        visible: s.visible,
        data: s.data
      }
    });
  }

  console.log("Done!");
}

seedHome().catch(console.error).finally(() => prisma.$disconnect());
