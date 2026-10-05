"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Badge,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teachersService } from "@/utils/api";

const DEPARTMENTS = [
  { id: "all", label: "Вся команда" },
  { id: "leadership", label: "Руководство школы" },
  { id: "exact", label: "Точные и IT науки" },
  { id: "languages", label: "Английский и языки (Cambridge)" },
  { id: "primary", label: "Начальная школа" },
  { id: "humanities", label: "Гуманитарный цикл" },
  { id: "sports", label: "Спорт и творчество" },
];

const FALLBACK_TEACHERS = [
  {
    id: 1,
    name: "Галина Алексеевна",
    subject: "Руководство школы",
    role: "Учредитель и директор школы",
    desc: "Учредитель и директор школы НОУ «Новое Поколение», лидер развития образования с 25-летним стажем руководства образовательными проектами. Автор передовых методик гармоничного воспитания лидеров.",
    department: "leadership",
    imageUrl: "/images/teachers/galina.jpg",
  },
  {
    id: 2,
    name: "Диляфруз Ганиевна",
    subject: "Математика и логика",
    role: "Ведущий преподаватель математики",
    desc: "Ведущий преподаватель математики, подготовка к республиканским олимпиадам и международным экзаменам SAT / Cambridge Math. Ученики занимают первые места в математических турнирах.",
    department: "exact",
    imageUrl: "/images/teachers/dilafruz.jpg",
  },
  {
    id: 3,
    name: "Нигора Усмановна",
    subject: "Английский язык",
    role: "Зав. кафедры английского языка",
    desc: "Учитель и зав. кафедры английского языка, сертификация Cambridge Assessment English, подготовка к IELTS (средний балл учеников 7.5+) и международным дебатам.",
    department: "languages",
    imageUrl: "/images/teachers/nigora.jpg",
  },
  {
    id: 4,
    name: "Альбина Николаевна",
    subject: "Начальные классы",
    role: "Классный руководитель младшей школы",
    desc: "Сильный преподаватель начального образования, индивидуальный подход, адаптационные методики и любовь к каждому ученику. Создает теплую и поддерживающую атмосферу для первоклассников.",
    department: "primary",
    imageUrl: "/images/teachers/albina.jpg",
  },
  {
    id: 5,
    name: "Алишер Махмудович",
    subject: "Робототехника и IT",
    role: "Руководитель лаборатории робототехники",
    desc: "Тренер школьной сборной по робототехнике, практическое обучение Python, Arduino, C++ и 3D-моделированию. Призеры международных хакатонов.",
    department: "exact",
    imageUrl: "/images/programs/high.jpg",
  },
  {
    id: 6,
    name: "Елена Сергеевна",
    subject: "Русский язык и литература",
    role: "Учитель высшей категории",
    desc: "Эксперт в развитии критического мышления, ораторского мастерства и углубленного анализа мировой литературы. Организатор школьного литературного клуба.",
    department: "humanities",
    imageUrl: "/images/teachers/albina.jpg",
  },
  {
    id: 7,
    name: "Рустам Камилович",
    subject: "Физика и астрономия",
    role: "Преподаватель физики",
    desc: "Практические лабораторные эксперименты, олимпиадная физика и развитие инженерного склада ума у школьников. Интерактивные демонстрации законов природы.",
    department: "exact",
    imageUrl: "/images/programs/middle.jpg",
  },
  {
    id: 8,
    name: "Шахноза Баходировна",
    subject: "Химия и биология",
    role: "Зав. естественно-научной лабораторией",
    desc: "Интерактивная био-лаборатория, микроскопия, экологические проекты и победы на городских олимпиадах по естествознанию.",
    department: "exact",
    imageUrl: "/images/teachers/nigora.jpg",
  },
  {
    id: 9,
    name: "Зарина Тимуровна",
    subject: "Cambridge Primary",
    role: "Учитель билингвального цикла",
    desc: "Преподавание по международным программам начальной ступени, развитие soft-skills и исследовательской любознательности с раннего возраста.",
    department: "primary",
    imageUrl: "/images/programs/primary.jpg",
  },
  {
    id: 10,
    name: "Фарход Искандарович",
    subject: "Физическая культура и спорт",
    role: "Мастер спорта, главный тренер",
    desc: "Организация секций по футболу, баскетболу, настольному теннису и шахматам. Воспитание командного духа, дисциплины и здоровья.",
    department: "sports",
    imageUrl: "/images/teachers/dilafruz.jpg",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState(FALLBACK_TEACHERS);
  const [selectedDept, setSelectedDept] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const res = await teachersService.getTeachers();
        if (res?.data && res.data.length > 0) {
          setTeachers(res.data);
        }
      } catch (err) {
        console.warn("Using fallback teachers", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTeachers();
  }, []);

  const resolveImage = (url, name) => {
    if (name?.includes("Галина") || url?.includes("galina") || url?.includes("Galina")) {
      return "/images/teachers/galina.jpg";
    }
    if (!url) return "/images/teachers/galina.jpg";
    if (url.startsWith("/images/")) return url;
    if (url.startsWith("/")) {
      const base = process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
        : "https://new-generation-school.onrender.com";
      return `${base}${url}`;
    }
    return url;
  };

  const filteredTeachers = selectedDept === "all"
    ? teachers
    : teachers.filter((t) => t.department === selectedDept);

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
            <Text fontSize="xs" color="#FFB800" fontWeight="bold">Преподаватели</Text>
          </Flex>

          <Heading as="h1" fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }} fontWeight="900" mb={4} lineHeight="1.15">
            Педагогический состав школы
          </Heading>

          <Text color="#94A3B8" fontSize={{ base: "md", md: "xl" }} maxW="3xl" lineHeight="relaxed">
            Наша гордость — высококвалифицированные педагоги, кандидаты наук, авторы учебных программ и сертифицированные тренеры Cambridge Assessment, которые вдохновляют учеников на великие свершения.
          </Text>
        </Box>
      </Box>

      {/* Main Content */}
      <Box py={{ base: 12, md: 16 }} px={{ base: 4, sm: 6, md: 12 }} maxW="7xl" mx="auto">
        {/* Department Filters */}
        <Flex gap={2} overflowX="auto" pb={4} mb={10}>
          {DEPARTMENTS.map((dept) => (
            <Button
              key={dept.id}
              size="sm"
              variant={selectedDept === dept.id ? "solid" : "outline"}
              bg={selectedDept === dept.id ? "#002045" : "transparent"}
              color={selectedDept === dept.id ? "white" : "#002045"}
              borderColor="rgba(0, 32, 69, 0.2)"
              _hover={{ bg: selectedDept === dept.id ? "#002045" : "gray.100" }}
              onClick={() => setSelectedDept(dept.id)}
              rounded="full"
              px={4}
              flexShrink={0}
            >
              {dept.label}
            </Button>
          ))}
        </Flex>

        {isLoading ? (
          <Flex justify="center" align="center" minH="300px">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={6}>
            {filteredTeachers.map((teacher, idx) => (
              <Box
                key={teacher.id || idx}
                bg="white"
                border="1px solid rgba(0, 32, 69, 0.08)"
                borderRadius="0"
                overflow="hidden"
                boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.04)"
                display="flex"
                flexDirection="column"
                h="full"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                cursor="pointer"
                onClick={() => setSelectedTeacher(teacher)}
                _hover={{
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 35px -10px rgba(0, 32, 69, 0.12)",
                  borderColor: "rgba(255, 184, 0, 0.4)",
                }}
              >
                {/* Photo */}
                <Box w="full" h={{ base: "320px", sm: "360px" }} bg="gray.100" overflow="hidden" position="relative">
                  <Box
                    as="img"
                    src={resolveImage(teacher.imageUrl)}
                    alt={teacher.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    objectPosition="top center"
                    transition="transform 0.4s ease"
                    _hover={{ transform: "scale(1.03)" }}
                  />
                  {teacher.department === "leadership" && (
                    <Badge
                      position="absolute"
                      top={3}
                      left={3}
                      bg="#FFB800"
                      color="#002045"
                      px={3}
                      py={1}
                      fontWeight="bold"
                      fontSize="2xs"
                      letterSpacing="wider"
                    >
                      РУКОВОДСТВО
                    </Badge>
                  )}
                </Box>

                {/* Details */}
                <Box p={5} display="flex" flexDirection="column" justifyContent="space-between" flex={1} bg="white">
                  <Box mb={3}>
                    <Text fontSize="xs" fontWeight="bold" color="#FFB800" textTransform="uppercase" letterSpacing="wider" mb={1}>
                      {teacher.subject}
                    </Text>
                    <Heading as="h4" fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="#002045" mb={1} lineHeight="1.3">
                      {teacher.name}
                    </Heading>
                    {teacher.role && (
                      <Text fontSize="xs" fontWeight="semibold" color="#64748B" mb={2}>
                        {teacher.role}
                      </Text>
                    )}
                  </Box>
                  <Text fontSize="xs" color="#94A3B8" lineHeight="1.5" noOfLines={3}>
                    {teacher.desc}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>

      {/* Teacher Bio Modal */}
      {selectedTeacher && (
        <Box
          position="fixed"
          inset={0}
          zIndex={1000}
          bg="rgba(0, 24, 51, 0.75)"
          backdropFilter="blur(6px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={() => setSelectedTeacher(null)}
        >
          <Box
            bg="white"
            rounded="3xl"
            overflow="hidden"
            maxW="lg"
            w="full"
            boxShadow="0 25px 50px -12px rgba(0, 32, 69, 0.4)"
            position="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Box w="full" h="300px" bg="gray.100" overflow="hidden" position="relative">
              <Box
                as="img"
                src={resolveImage(selectedTeacher.imageUrl)}
                alt={selectedTeacher.name}
                w="full"
                h="full"
                objectFit="cover"
                objectPosition="top center"
              />
              <Button
                position="absolute"
                top={3}
                right={3}
                size="sm"
                rounded="full"
                bg="blackAlpha.700"
                color="white"
                _hover={{ bg: "black" }}
                onClick={() => setSelectedTeacher(null)}
              >
                ✕
              </Button>
            </Box>
            <Box p={6}>
              <Text fontSize="xs" fontWeight="bold" color="#FFB800" textTransform="uppercase" mb={1}>
                {selectedTeacher.subject}
              </Text>
              <Heading size="md" color="#002045" mb={1}>
                {selectedTeacher.name}
              </Heading>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600" mb={4}>
                {selectedTeacher.role}
              </Text>
              <Text fontSize="sm" color="gray.700" lineHeight="relaxed">
                {selectedTeacher.desc}
              </Text>
            </Box>
          </Box>
        </Box>
      )}

      <Footer />
    </>
  );
}
