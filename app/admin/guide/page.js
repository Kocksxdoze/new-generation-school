"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  {
    id: "leads",
    title: "1. Обработка заявок родителей",
    icon: "description",
    badge: "Ежедневно",
    badgeColor: "red",
    desc: "Прием и фиксация обращений с форм записи на консультацию, поступление и экскурсии по кампусу.",
    steps: [
      {
        title: "Просмотр входящих заявок",
        text: "Перейдите в раздел «Заявки». Вверху отображается счетчик новых обращений с красным индикатором.",
      },
      {
        title: "Фильтрация и поиск",
        text: "Используйте быстрые табы «Новые», «В обработке», «Завершенные» или строку поиска по имени родителя и номеру телефона.",
      },
      {
        title: "Копирование контактов",
        text: "Нажмите кнопку «Детали» для просмотра полного сообщения, класса ребенка и нажмите «Скопировать номер» для быстрого звонка.",
      },
      {
        title: "Смена статуса",
        text: "После звонка переведите статус из «Новая» в «В обработке». После подтверждения зачисления выберите «Завершена».",
      },
    ],
    link: "/admin/applications",
    linkText: "Перейти к заявкам",
  },
  {
    id: "teachers",
    title: "2. Педагогический состав и руководство",
    icon: "school",
    badge: "Кадры",
    badgeColor: "blue",
    desc: "Управление карточками учителей, квалификацией, кафедрами и фотографиями.",
    steps: [
      {
        title: "Первая карточка (Директор)",
        text: "Первой карточкой с порядком #1 установлена Галина Алексеевна (Учредитель и директор). Не удаляйте ее порядок, чтобы директор всегда оставался во главе команды.",
      },
      {
        title: "Добавление нового педагога",
        text: "Нажмите «Добавить учителя», укажите ФИО, предмет, должность/звание, выберите кафедру и заполните достижения/стаж.",
      },
      {
        title: "Установка фотографии",
        text: "Вы можете загрузить файл с компьютера (кнопка «Загрузить»), вставить прямую ссылку на фото или выбрать один из заготовленных пресетов.",
      },
      {
        title: "Кафедры и фильтрация",
        text: "Каждый учитель привязан к кафедре (Руководство, Точные науки, Cambridge, Начальная школа, Спорт), что позволяет родителям удобно фильтровать состав на сайте.",
      },
    ],
    link: "/admin/teachers",
    linkText: "Управление учителями",
  },
  {
    id: "universities",
    title: "3. Университеты поступления выпускников",
    icon: "account_balance",
    badge: "Академика",
    badgeColor: "purple",
    desc: "Каталог мировых вузов (Ivy League, Оксфорд, Кембридж, Сингапур) и грантов.",
    steps: [
      {
        title: "Добавление университета",
        text: "В разделе «Университеты» нажмите «Добавить вуз». Укажите наименование (например, Stanford University), страну, город и мировой рейтинг QS.",
      },
      {
        title: "Указание стипендий и грантов",
        text: "В поле «Стипендия» укажите размер финансирования (например, «Full Ride $82,000/год» или «Президентский грант»). Это привлекает родителей сильными академическими результатами школы.",
      },
      {
        title: "Специальности",
        text: "Перечислите направления через запятую (например, Computer Science, Economics, Biomedicine).",
      },
    ],
    link: "/admin/universities",
    linkText: "Каталог университетов",
  },
  {
    id: "gallery",
    title: "4. Галерея современной среды и кампуса",
    icon: "photo_library",
    badge: "Медиа",
    badgeColor: "green",
    desc: "Публикация атмосферных фотографий и видеороликов кабинетов, лабораторий и спорта.",
    steps: [
      {
        title: "Форматы медиа",
        text: "Поддерживаются как фотографии (JPG, PNG, WEBP), так и видеоролики (MP4, WebM).",
      },
      {
        title: "Автовоспроизведение видео",
        text: "Видеоролики в галерее запускаются автоматически без звука (loop & muted), создавая динамичный эффект присутствия в кампусе.",
      },
      {
        title: "Опция «Выводить в топ» (Featured)",
        text: "При включении галочки Featured объект занимает увеличенный акцентный блок (2x2 или 2x1) в интерактивной Bento-сетке галереи.",
      },
      {
        title: "Категории",
        text: "Разбивайте материалы по категориям: «Кампус и архитектура», «Лаборатории и IT», «Классы и аудитории», «Спорт и здоровье», «Жизнь школы».",
      },
    ],
    link: "/admin/gallery",
    linkText: "Перейти в галерею",
  },
  {
    id: "news",
    title: "5. Публикация новостей и событий",
    icon: "newspaper",
    badge: "Пресс-центр",
    badgeColor: "orange",
    desc: "Освещение олимпиад, праздников, открытых уроков и поездок школьников.",
    steps: [
      {
        title: "Создание статьи",
        text: "Нажмите «Создать новость», укажите заголовок (URL slug генерируется автоматически), выберите категорию (Новость, Мероприятие, Олимпиада, Достижения).",
      },
      {
        title: "Обложка статьи",
        text: "Загрузите широкоформатное фото высокого качества. Оно будет отображаться в карточке анонса и в заголовке статьи.",
      },
      {
        title: "Публикация",
        text: "Тумблер «Опубликовано» позволяет сохранить материал как черновик или мгновенно вывести на сайт.",
      },
    ],
    link: "/admin/news",
    linkText: "Управление новостями",
  },
  {
    id: "security",
    title: "6. Безопасность и правила доступа",
    icon: "security",
    badge: "Безопасность",
    badgeColor: "teal",
    desc: "Контроль учетных записей администраторов и журнал аудита.",
    steps: [
      {
        title: "Учетные записи",
        text: "Каждому администратору школы выдается персональный логин и стойкий пароль. Никогда не передавайте пароль третьим лицам.",
      },
      {
        title: "Аудит действий",
        text: "Все входы в систему, изменения статусов заявок, добавление и удаление записей регистрируются в системном журнале безопасности.",
      },
      {
        title: "Защита от перебора",
        text: "При многократном неверном вводе пароля IP-адрес автоматически временно блокируется системой защиты.",
      },
    ],
    link: "/admin",
    linkText: "На главный дашборд",
  },
];

export default function AdminGuidePage() {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);

  const currentSection = SECTIONS.find((s) => s.id === activeTab) || SECTIONS[0];

  return (
    <Box maxW="1200px" mx="auto">
      {/* Header Banner */}
      <Box
        bg="linear-gradient(135deg, #002045 0%, #003366 100%)"
        color="white"
        p={{ base: 6, md: 8 }}
        rounded="3xl"
        mb={8}
        boxShadow="xl"
      >
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <HStack spacing={2} mb={2}>
              <Badge bg="yellow.400" color="black" px={2.5} py={0.5} rounded="md" fontWeight="bold">
                NEW GENERATION SCHOOL
              </Badge>
              <Text fontSize="xs" color="blue.200">
                Версия системы: 2.4 Enterprise
              </Text>
            </HStack>
            <Heading size="lg" mb={2}>
              Инструкция и руководство администратора
            </Heading>
            <Text color="blue.100" fontSize="sm" maxW="700px">
              Подробное руководство по управлению школьным порталом NGS: прием заявок, модерация новостей, редактирование педагогического состава, вузов и галереи кампуса.
            </Text>
          </Box>

          <Button
            as={Link}
            href="/"
            target="_blank"
            bg="white"
            color="#002045"
            size="sm"
            _hover={{ bg: "blue.50" }}
          >
            <HStack spacing={1}>
              <Text>Открыть сайт школы</Text>
              <Box as="span" className="material-symbols-outlined" fontSize="sm">
                open_in_new
              </Box>
            </HStack>
          </Button>
        </Flex>
      </Box>

      {/* Navigation Pills */}
      <Flex gap={2} mb={8} overflowX="auto" pb={2}>
        {SECTIONS.map((sec) => (
          <Button
            key={sec.id}
            size="sm"
            rounded="xl"
            variant={activeTab === sec.id ? "solid" : "outline"}
            bg={activeTab === sec.id ? "#002045" : "white"}
            color={activeTab === sec.id ? "white" : "gray.700"}
            borderColor={activeTab === sec.id ? "#002045" : "gray.200"}
            _hover={{ bg: activeTab === sec.id ? "#001835" : "gray.50" }}
            onClick={() => setActiveTab(sec.id)}
            flexShrink={0}
          >
            <HStack spacing={2}>
              <Box as="span" className="material-symbols-outlined" fontSize="18px">
                {sec.icon}
              </Box>
              <Text>{sec.title.split(". ")[1]}</Text>
            </HStack>
          </Button>
        ))}
      </Flex>

      {/* Active Section Detail Card */}
      <Box bg="white" p={{ base: 6, md: 8 }} rounded="3xl" boxShadow="sm" border="1px solid" borderColor="gray.100" mb={8}>
        <Flex justify="space-between" align="flex-start" mb={6} flexWrap="wrap" gap={4}>
          <Box>
            <HStack spacing={3} mb={2}>
              <Box
                w={10}
                h={10}
                rounded="xl"
                bg="blue.50"
                color="blue.600"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box as="span" className="material-symbols-outlined" fontSize="24px">
                  {currentSection.icon}
                </Box>
              </Box>
              <Heading size="md" color="#002045">
                {currentSection.title}
              </Heading>
              <Badge colorScheme={currentSection.badgeColor} px={2.5} py={0.5} rounded="md">
                {currentSection.badge}
              </Badge>
            </HStack>
            <Text color="gray.600" fontSize="sm">
              {currentSection.desc}
            </Text>
          </Box>

          <Button
            as={Link}
            href={currentSection.link}
            bg="#002045"
            color="white"
            size="sm"
            _hover={{ bg: "#003366" }}
          >
            <HStack spacing={1}>
              <Text>{currentSection.linkText}</Text>
              <Box as="span" className="material-symbols-outlined" fontSize="sm">
                arrow_forward
              </Box>
            </HStack>
          </Button>
        </Flex>

        {/* Steps Grid */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {currentSection.steps.map((step, idx) => (
            <Box
              key={idx}
              p={5}
              bg="gray.50"
              rounded="2xl"
              border="1px solid"
              borderColor="gray.100"
              position="relative"
            >
              <Flex align="center" gap={3} mb={2}>
                <Box
                  w={7}
                  h={7}
                  rounded="full"
                  bg="#002045"
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {idx + 1}
                </Box>
                <Heading size="xs" color="#002045">
                  {step.title}
                </Heading>
              </Flex>
              <Text fontSize="xs" color="gray.600" lineHeight="1.6" pl={10}>
                {step.text}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Quick Contacts & Support Box */}
      <Box bg="#F8FAFC" p={6} rounded="2xl" border="1px dashed" borderColor="gray.300">
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="xs" color="#002045" mb={1}>
              Техническая поддержка и системное администрирование
            </Heading>
            <Text fontSize="xs" color="gray.500">
              По вопросам расширения прав доступа, сброса паролей и системных обновлений обращайтесь к разработчику сайта.
            </Text>
          </Box>
          <HStack spacing={4}>
            <Text fontSize="xs" color="#002045" fontWeight="bold">
              📞 +998 (91) 325-95-65
            </Text>
            <Text fontSize="xs" color="gray.500">
              |
            </Text>
            <Text fontSize="xs" color="#002045" fontWeight="bold">
              ✉️ new_generation_school@mail.ru
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
