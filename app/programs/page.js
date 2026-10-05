"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  Badge,
  HStack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PROGRAMS_DATA = [
  {
    id: "preschool",
    tag: "01",
    title: "Дошколята (Pre-school)",
    age: "5-7 лет",
    badge: "Подготовка к школе",
    image: "/images/programs/preschool.jpg",
    desc: "Мягкая адаптация ребенка к учебному процессу через интерактивные развивающие игры по системе Монтессори. Развиваем эмоциональный интеллект, правильную речь, логику и интерес к познанию мира.",
    subjects: [
      "Развитие речи и основы грамоты",
      "Занимательная математика и логика",
      "Английский в игровой форме (Cambridge Early)",
      "Окружающий мир и основы естествознания",
      "Творческая мастерская (лепка, рисование, аппликация)",
      "ЛФК, гимнастика и ритмика",
    ],
    highlights: [
      "Классы до 16 детей для максимального внимания",
      "Психолог и логопед в штате для мягкой адаптации",
      "Сбалансированное 4-разовое питание",
      "Дневной отдых и активные прогулки на свежем воздухе",
    ],
  },
  {
    id: "primary",
    tag: "02",
    title: "Начальная школа",
    age: "1-4 классы",
    badge: "Фундамент знаний",
    image: "/images/programs/primary.jpg",
    desc: "Формируем прочный академический фундамент и осознанную тягу к учебе. Обучение построено на синтезе углубленной государственной программы и международного стандарта Cambridge Primary.",
    subjects: [
      "Углубленная математика и логическое мышление",
      "Cambridge Primary English (с носителями языка)",
      "Русский язык, чтение и литературный анализ",
      "Узбекский язык (государственный стандарт)",
      "Science (естествознание с простыми опытами)",
      "Начальная информатика и шахматы",
      "Изобразительное искусство, музыка и спорт",
    ],
    highlights: [
      "Все домашние задания выполняются в школе с учителем",
      "Олимпиадный кружок по математике с 1 класса",
      "Билингвальные модули обучения",
      "Школа полного дня: 8:30 — 17:30 с питанием",
    ],
  },
  {
    id: "middle",
    tag: "03",
    title: "Средняя школа",
    age: "5-9 классы",
    badge: "Исследования и STEM",
    image: "/images/programs/middle.jpg",
    desc: "Переход к углубленному профильному обучению. Развиваем критическое мышление, исследовательские навыки, умение работать в команде над научными проектами и участвовать в престижных олимпиадах.",
    subjects: [
      "Алгебра, геометрия и олимпиадная математика",
      "Cambridge Lower Secondary English & Literature",
      "Физика и астрономия в реальных лабораториях",
      "Химия и биология (практические опыты)",
      "Информатика, программирование на Python и алгоритмы",
      "Робототехника и мехатроника (Arduino, датчики)",
      "Всемирная история и история Узбекистана",
      "Второй иностранный язык на выбор",
    ],
    highlights: [
      "Практические лабораторные работы каждую неделю",
      "Участие в международных олимпиадах (Kangaroo, SASMO)",
      "Хакатоны, дебатные клубы и бизнес-игры",
      "Индивидуальные траектории развития способностей",
    ],
  },
  {
    id: "high",
    tag: "04",
    title: "Старшая школа",
    age: "10-11 классы",
    badge: "Путь в университет",
    image: "/images/programs/high.jpg",
    desc: "Интенсивная предуниверситетская подготовка к поступлению в топовые вузы мира и Узбекистана. Профильные направления, подготовка к международным стандартизированным тестам SAT, IELTS, TOEFL.",
    subjects: [
      "Профильная математика (Calculus, SAT Math)",
      "IELTS Academic & Academic Writing",
      "Компьютерные науки (CS, Web, AI основы)",
      "Профильные физика / химия / биология",
      "Экономика, бизнес-планирование и основы права",
      "Профориентационные стажировки и проектные кейсы",
      "Создание академического портфолио для грантов",
    ],
    highlights: [
      "100% поступление выпускников в престижные вузы",
      "Персональный College Counselor для подачи на гранты",
      "Написание сильных мотивационных писем и эссе",
      "Сертификация уровня языка IELTS 7.0 - 8.5",
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <Navbar />

      <Box bg="#001833" color="white" pt={{ base: 28, md: 36 }} pb={{ base: 16, md: 20 }} px={{ base: 4, sm: 6, md: 12 }}>
        <Box maxW="7xl" mx="auto">
          {/* Breadcrumb */}
          <Flex align="center" gap={2} mb={4}>
            <Link href="/">
              <Text fontSize="xs" color="#94A3B8" _hover={{ color: "#FFB800" }}>Главная</Text>
            </Link>
            <Text fontSize="xs" color="#64748B">/</Text>
            <Text fontSize="xs" color="#FFB800" fontWeight="bold">Учебные программы</Text>
          </Flex>

          <Heading as="h1" fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }} fontWeight="900" mb={4} lineHeight="1.15">
            Образовательные программы New Generation
          </Heading>

          <Text color="#94A3B8" fontSize={{ base: "md", md: "xl" }} maxW="3xl" lineHeight="relaxed">
            Непрерывный образовательный трек от 5 лет до поступления в лучшие университеты мира. Синтез фундаментальной академической школы, стандартов Cambridge и передовых STEM-технологий.
          </Text>
        </Box>
      </Box>

      {/* Program Details Section */}
      <Box py={{ base: 12, md: 16 }} px={{ base: 4, sm: 6, md: 12 }} maxW="7xl" mx="auto">
        <VStack spacing={16} align="stretch">
          {PROGRAMS_DATA.map((prog, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <Box
                key={prog.id}
                id={prog.id}
                p={{ base: 6, md: 10 }}
                rounded="3xl"
                bg="white"
                border="1px solid rgba(0, 32, 69, 0.08)"
                boxShadow="0 10px 30px -5px rgba(0, 32, 69, 0.06)"
                transition="all 0.3s"
                _hover={{ borderColor: "rgba(255, 184, 0, 0.4)", boxShadow: "0 20px 40px -10px rgba(0, 32, 69, 0.1)" }}
              >
                <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={{ base: 8, lg: 12 }} alignItems="center">
                  {/* Image Column */}
                  <GridItem colSpan={{ base: 12, lg: 5 }} order={{ base: 1, lg: isEven ? 2 : 1 }}>
                    <Box
                      position="relative"
                      h={{ base: "260px", sm: "340px", md: "400px" }}
                      rounded="2xl"
                      overflow="hidden"
                      boxShadow="0 12px 28px rgba(0, 32, 69, 0.15)"
                    >
                      <Box
                        as="img"
                        src={prog.image}
                        alt={prog.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                        transition="transform 0.4s ease"
                        _hover={{ transform: "scale(1.03)" }}
                      />
                      <Badge
                        position="absolute"
                        top={4}
                        left={4}
                        bg="#002045"
                        color="#FFB800"
                        px={3}
                        py={1.5}
                        rounded="xl"
                        fontSize="xs"
                        fontWeight="bold"
                        letterSpacing="wider"
                      >
                        {prog.tag} • {prog.age}
                      </Badge>
                    </Box>
                  </GridItem>

                  {/* Content Column */}
                  <GridItem colSpan={{ base: 12, lg: 7 }} order={{ base: 2, lg: isEven ? 1 : 2 }}>
                    <Flex align="center" gap={3} mb={3}>
                      <Badge colorScheme="blue" px={3} py={1} rounded="full" fontSize="2xs" textTransform="uppercase">
                        {prog.badge}
                      </Badge>
                      <Text fontSize="sm" fontWeight="bold" color="#FFB800">
                        Возраст: {prog.age}
                      </Text>
                    </Flex>

                    <Heading as="h2" fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }} fontWeight="bold" color="#002045" mb={4}>
                      {prog.title}
                    </Heading>

                    <Text color="#64748B" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed" mb={6}>
                      {prog.desc}
                    </Text>

                    {/* Subjects Grid */}
                    <Box mb={6}>
                      <Text fontSize="xs" fontWeight="bold" color="#002045" textTransform="uppercase" letterSpacing="wider" mb={3}>
                        Ключевые дисциплины программы:
                      </Text>
                      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2.5}>
                        {prog.subjects.map((sub, sIdx) => (
                          <Flex key={sIdx} align="center" gap={2} fontSize="xs" color="#334155">
                            <Box as="span" className="material-symbols-outlined" color="#FFB800" fontSize="16px">
                              check_circle
                            </Box>
                            <Text fontWeight="medium">{sub}</Text>
                          </Flex>
                        ))}
                      </SimpleGrid>
                    </Box>

                    {/* Highlights */}
                    <Box p={4} rounded="2xl" bg="rgba(0, 32, 69, 0.03)" border="1px solid" borderColor="rgba(0, 32, 69, 0.06)" mb={6}>
                      <Text fontSize="2xs" fontWeight="bold" color="#94A3B8" textTransform="uppercase" mb={2}>
                        Преимущества этапа:
                      </Text>
                      <Flex wrap="wrap" gap={3}>
                        {prog.highlights.map((h, hIdx) => (
                          <Flex key={hIdx} align="center" gap={1.5} fontSize="xs" color="#002045" fontWeight="semibold">
                            <Box as="span" className="material-symbols-outlined" color="#002045" fontSize="14px">
                              verified
                            </Box>
                            {h}
                          </Flex>
                        ))}
                      </Flex>
                    </Box>

                    <Link href="/apply">
                      <Button
                        size="md"
                        bg="#002045"
                        color="white"
                        _hover={{ bg: "#003366", transform: "translateY(-2px)" }}
                        rounded="full"
                        px={6}
                        rightIcon={<span className="material-symbols-outlined">arrow_forward</span>}
                      >
                        Записаться в {prog.title.split(" ")[0]}
                      </Button>
                    </Link>
                  </GridItem>
                </Grid>
              </Box>
            );
          })}
        </VStack>

        {/* Day Schedule Structure */}
        <Box mt={20} p={{ base: 6, md: 10 }} rounded="3xl" bg="white" border="1px solid rgba(0, 32, 69, 0.08)">
          <Box textAlign="center" maxW="2xl" mx="auto" mb={8}>
            <Text color="#FFB800" fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" mb={2}>
              РЕЖИМ ДНЯ ПОЛНОГО ДНЯ
            </Text>
            <Heading size="lg" color="#002045" fontWeight="bold">
              Как проходит день в New Generation School
            </Heading>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
            <Box p={5} rounded="2xl" bg="gray.50" border="1px solid" borderColor="gray.100">
              <Text fontSize="lg" fontWeight="900" color="#FFB800" mb={1}>08:30 — 09:00</Text>
              <Heading size="xs" color="#002045" mb={2}>Встреча и утренняя зарядка</Heading>
              <Text fontSize="xs" color="gray.600">Сбор учащихся, позитивный настрой, сбалансированный завтрак.</Text>
            </Box>

            <Box p={5} rounded="2xl" bg="gray.50" border="1px solid" borderColor="gray.100">
              <Text fontSize="lg" fontWeight="900" color="#FFB800" mb={1}>09:00 — 13:00</Text>
              <Heading size="xs" color="#002045" mb={2}>Академический блок</Heading>
              <Text fontSize="xs" color="gray.600">Математика, Cambridge English, науки, лабораторные занятия.</Text>
            </Box>

            <Box p={5} rounded="2xl" bg="gray.50" border="1px solid" borderColor="gray.100">
              <Text fontSize="lg" fontWeight="900" color="#FFB800" mb={1}>13:00 — 14:30</Text>
              <Heading size="xs" color="#002045" mb={2}>Обед и отдых на воздухе</Heading>
              <Text fontSize="xs" color="gray.600">Горячий обед от шеф-повара, прогулка на зеленой территории школы.</Text>
            </Box>

            <Box p={5} rounded="2xl" bg="gray.50" border="1px solid" borderColor="gray.100">
              <Text fontSize="lg" fontWeight="900" color="#FFB800" mb={1}>14:30 — 17:30</Text>
              <Heading size="xs" color="#002045" mb={2}>Продленка и кружки</Heading>
              <Text fontSize="xs" color="gray.600">Домашние задания с учителем, робототехника, спорт, полдник.</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
