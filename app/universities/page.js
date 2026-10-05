"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Input,
  Button,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UNIVERSITIES_DATA = [
  {
    name: "Harvard University",
    country: "США",
    region: "usa",
    city: "Кембридж, Массачусетс",
    ranking: "QS #4 в мире",
    majors: ["Computer Science", "Economics", "Applied Mathematics"],
    scholarship: "Full Ride ($82,000/год)",
    color: "#A51C30",
    graduates: "3 выпускника",
    logoLetter: "H",
  },
  {
    name: "University of Oxford",
    country: "Великобритания",
    region: "europe",
    city: "Оксфорд",
    ranking: "QS #3 в мире",
    majors: ["Philosophy, Politics and Economics", "Biomedical Sciences"],
    scholarship: "Clarendon Scholarship",
    color: "#002147",
    graduates: "2 выпускника",
    logoLetter: "O",
  },
  {
    name: "University of Cambridge",
    country: "Великобритания",
    region: "europe",
    city: "Кембридж",
    ranking: "QS #2 в мире",
    majors: ["Natural Sciences", "Engineering", "Mathematics"],
    scholarship: "Cambridge Trust Grant",
    color: "#D6083B",
    graduates: "3 выпускника",
    logoLetter: "C",
  },
  {
    name: "MIT (Massachusetts Institute of Technology)",
    country: "США",
    region: "usa",
    city: "Бостон, Массачусетс",
    ranking: "QS #1 в мире",
    majors: ["Artificial Intelligence & CS", "Robotics Engineering"],
    scholarship: "Need-based Grant ($78,000/год)",
    color: "#7B1113",
    graduates: "2 выпускника",
    logoLetter: "M",
  },
  {
    name: "Stanford University",
    country: "США",
    region: "usa",
    city: "Пало-Альто, Калифорния",
    ranking: "QS #5 в мире",
    majors: ["Management Science & Engineering", "Computer Systems"],
    scholarship: "Knight-Hennessy Scholars",
    color: "#8C1515",
    graduates: "2 выпускника",
    logoLetter: "S",
  },
  {
    name: "Seoul National University (SNU)",
    country: "Южная Корея",
    region: "asia",
    city: "Сеул",
    ranking: "QS #41 в мире (#1 Корея)",
    majors: ["Electrical and Computer Engineering", "Global Business"],
    scholarship: "GKS Korean Government Grant",
    color: "#0F0F70",
    graduates: "5 выпускников",
    logoLetter: "SNU",
  },
  {
    name: "KAIST",
    country: "Южная Корея",
    region: "asia",
    city: "Тэджон",
    ranking: "QS #56 в мире (Инженерия)",
    majors: ["Aerospace Engineering", "Data Science & Software"],
    scholarship: "KAIST International Full Grant",
    color: "#004191",
    graduates: "4 выпускника",
    logoLetter: "K",
  },
  {
    name: "Westminster International University in Tashkent (WIUT)",
    country: "Узбекистан / Великобритания",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Британский диплом",
    majors: ["Business Information Systems", "Finance & Commercial Law"],
    scholarship: "Государственный грант (100%)",
    color: "#002B49",
    graduates: "42 выпускника",
    logoLetter: "W",
  },
  {
    name: "INHA University in Tashkent",
    country: "Узбекистан / Южная Корея",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Инженерный лидер",
    majors: ["Computer Science & Software", "Logistics & Supply Chain"],
    scholarship: "Гранты учредителей и IT Park",
    color: "#0072CE",
    graduates: "28 выпускников",
    logoLetter: "I",
  },
  {
    name: "New Uzbekistan University (Янги Узбекистон)",
    country: "Узбекистан",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Президентский технологический университет",
    majors: ["Artificial Intelligence", "Cybersecurity", "Chemical Engineering"],
    scholarship: "Президентский грант (100%)",
    color: "#00833E",
    graduates: "16 выпускников",
    logoLetter: "NU",
  },
  {
    name: "MDIS Tashkent",
    country: "Сингапур / Ташкент",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Management Development Institute of Singapore",
    majors: ["International Tourism", "Banking and Finance"],
    scholarship: "Стипендия за отличную учебу",
    color: "#ED1C24",
    graduates: "19 выпускников",
    logoLetter: "M",
  },
  {
    name: "KIMEP University",
    country: "Казахстан",
    region: "asia",
    city: "Алматы",
    ranking: "Топ-бизнес школа СНГ",
    majors: ["International Relations", "Accounting and Audit"],
    scholarship: "Merit-based Grant",
    color: "#4B0082",
    graduates: "9 выпускников",
    logoLetter: "K",
  },
];

const REGIONS = [
  { id: "all", label: "Все университеты" },
  { id: "usa", label: "США и Лига Плюща" },
  { id: "europe", label: "Великобритания и Европа" },
  { id: "asia", label: "Южная Корея и Азия" },
  { id: "uzbekistan", label: "Ведущие вузы Узбекистана" },
];

export default function UniversitiesPage() {
  const [unis, setUnis] = useState(UNIVERSITIES_DATA);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ngs_custom_universities");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setUnis(parsed);
          }
        }
      } catch (e) {}
    }
  }, []);

  const filteredUnis = unis.filter((uni) => {
    const matchesRegion = selectedRegion === "all" || uni.region === selectedRegion;
    const matchesSearch =
      uni.name.toLowerCase().includes(search.toLowerCase()) ||
      uni.country.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(uni.majors) && uni.majors.some((m) => m.toLowerCase().includes(search.toLowerCase())));
    return matchesRegion && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <Box bg="#001833" color="white" pt={{ base: 28, md: 36 }} pb={{ base: 16, md: 20 }} px={{ base: 4, sm: 6, md: 12 }}>
        <Box maxW="7xl" mx="auto">
          {/* Breadcrumb / Tag */}
          <Flex align="center" gap={2} mb={4}>
            <Link href="/">
              <Text fontSize="xs" color="#94A3B8" _hover={{ color: "#FFB800" }}>Главная</Text>
            </Link>
            <Text fontSize="xs" color="#64748B">/</Text>
            <Text fontSize="xs" color="#FFB800" fontWeight="bold">Университеты выпускников</Text>
          </Flex>

          <Heading as="h1" fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }} fontWeight="900" mb={4} lineHeight="1.15">
            Куда поступают наши выпускники
          </Heading>

          <Text color="#94A3B8" fontSize={{ base: "md", md: "xl" }} maxW="3xl" lineHeight="relaxed" mb={10}>
            100% выпускников школы New Generation School становятся студентами престижных университетов США, Великобритании, Европы, Южной Кореи и флагманских вузов Узбекистана.
          </Text>

          {/* Key Metrics Banner */}
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} p={6} rounded="2xl" bg="rgba(255,255,255,0.05)" border="1px solid rgba(255,184,0,0.25)">
            <Box>
              <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" color="#FFB800">100%</Text>
              <Text fontSize="xs" color="#94A3B8" mt={1}>Поступление в вузы первой волны</Text>
            </Box>
            <Box>
              <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" color="#FFB800">\$2.4M+</Text>
              <Text fontSize="xs" color="#94A3B8" mt={1}>Выиграно грантов и стипендий</Text>
            </Box>
            <Box>
              <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" color="#FFB800">72%</Text>
              <Text fontSize="xs" color="#94A3B8" mt={1}>Обучаются на бюджетных грантах</Text>
            </Box>
            <Box>
              <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="900" color="#FFB800">146+</Text>
              <Text fontSize="xs" color="#94A3B8" mt={1}>Выпускников успешно трудоустроены</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Main Content & University Grid */}
      <Box py={{ base: 12, md: 16 }} px={{ base: 4, sm: 6, md: 12 }} maxW="7xl" mx="auto">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "stretch", md: "center" }} gap={4} mb={10}>
          {/* Region Tabs */}
          <Flex gap={2} overflowX="auto" pb={2}>
            {REGIONS.map((r) => (
              <Button
                key={r.id}
                size="sm"
                variant={selectedRegion === r.id ? "solid" : "outline"}
                bg={selectedRegion === r.id ? "#002045" : "transparent"}
                color={selectedRegion === r.id ? "white" : "#002045"}
                borderColor="rgba(0, 32, 69, 0.2)"
                _hover={{ bg: selectedRegion === r.id ? "#002045" : "gray.100" }}
                onClick={() => setSelectedRegion(r.id)}
                rounded="full"
                px={4}
              >
                {r.label}
              </Button>
            ))}
          </Flex>

          {/* Search Box */}
          <Box w={{ base: "full", md: "320px" }}>
            <Input
              placeholder="Поиск по вузу, стране или специальности..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rounded="full"
              fontSize="sm"
              borderColor="gray.300"
              _focus={{ borderColor: "#FFB800", boxShadow: "0 0 0 1px #FFB800" }}
            />
          </Box>
        </Flex>

        {/* Universities Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredUnis.map((uni, idx) => (
            <Box
              key={idx}
              bg="white"
              rounded="3xl"
              p={6}
              border="1px solid rgba(0, 32, 69, 0.08)"
              boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.05)"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "0 20px 35px -10px rgba(0, 32, 69, 0.12)",
                borderColor: "rgba(255, 184, 0, 0.5)",
              }}
            >
              <Box>
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <Flex
                    w={14}
                    h={14}
                    rounded="2xl"
                    bg={uni.color}
                    color="white"
                    align="center"
                    justify="center"
                    fontWeight="900"
                    fontSize={uni.logoLetter.length > 2 ? "xs" : "lg"}
                    boxShadow="0 8px 16px -4px rgba(0,0,0,0.2)"
                  >
                    {uni.logoLetter}
                  </Flex>

                  <Badge
                    px={3}
                    py={1}
                    rounded="full"
                    bg="rgba(255, 184, 0, 0.15)"
                    color="#002045"
                    border="1px solid rgba(255, 184, 0, 0.4)"
                    fontSize="2xs"
                    fontWeight="bold"
                  >
                    {uni.ranking}
                  </Badge>
                </Flex>

                <Heading as="h3" fontSize="xl" fontWeight="bold" color="#002045" mb={1} lineHeight="1.3">
                  {uni.name}
                </Heading>

                <Flex align="center" gap={1.5} color="#64748B" fontSize="xs" mb={4}>
                  <Box as="span" className="material-symbols-outlined" fontSize="16px">location_on</Box>
                  <Text>{uni.city}, {uni.country}</Text>
                </Flex>

                <Box mb={4} p={3.5} rounded="2xl" bg="gray.50" border="1px solid" borderColor="gray.100">
                  <Text fontSize="2xs" fontWeight="bold" color="#94A3B8" textTransform="uppercase" mb={1}>
                    Специальности наших студентов:
                  </Text>
                  <Flex wrap="wrap" gap={1.5}>
                    {uni.majors.map((m, mIdx) => (
                      <Badge key={mIdx} px={2} py={0.5} rounded="md" bg="white" border="1px solid" borderColor="gray.200" fontSize="2xs" color="#002045">
                        {m}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </Box>

              <Flex justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="gray.100">
                <Box>
                  <Text fontSize="2xs" color="#94A3B8" textTransform="uppercase" fontWeight="bold">Грант / Стипендия</Text>
                  <Text fontSize="xs" fontWeight="bold" color="#00833E">{uni.scholarship}</Text>
                </Box>
                <Badge colorScheme="blue" variant="subtle" rounded="full" px={2.5} py={0.5} fontSize="2xs">
                  {uni.graduates}
                </Badge>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

        {filteredUnis.length === 0 && (
          <Box textAlign="center" py={16}>
            <Heading size="md" color="gray.500" mb={2}>Университеты не найдены</Heading>
            <Text color="gray.400" fontSize="sm">Попробуйте изменить поисковый запрос или фильтр региона</Text>
          </Box>
        )}

        {/* CTA section */}
        <Box
          mt={16}
          p={{ base: 8, md: 12 }}
          rounded="3xl"
          bg="#002045"
          color="white"
          textAlign="center"
          position="relative"
          overflow="hidden"
          boxShadow="0 25px 50px -12px rgba(0, 32, 69, 0.3)"
        >
          <Heading size="lg" mb={3} fontWeight="bold">
            Хотите, чтобы ваш ребенок поступил в топовый вуз мира?
          </Heading>
          <Text color="#94A3B8" maxW="2xl" mx="auto" mb={8} fontSize="sm">
            Мы начинаем профориентацию, подготовку к олимпиадам и международным экзаменам с ранних классов. Запишитесь на консультацию и экскурсию по школе.
          </Text>
          <Link href="/apply">
            <Button
              size="lg"
              bg="#FFB800"
              color="#002045"
              fontWeight="bold"
              px={10}
              rounded="full"
              _hover={{ bg: "#FFC72C", transform: "translateY(-2px)" }}
              boxShadow="0 10px 25px rgba(255, 184, 0, 0.4)"
            >
              Подать заявку на поступление
            </Button>
          </Link>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
