"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { teachersService } from "@/utils/api";

const DEFAULT_TEACHERS = [
  {
    name: "Галина Алексеевна",
    subject: "Руководство школы",
    exp: "Учредитель и директор школы",
    desc: "Учредитель и директор школы НОУ «Новое Поколение», лидер развития образования",
    imageUrl: "/images/teachers/galina.jpg"
  },
  {
    name: "Диляфруз Ганиевна",
    subject: "Математика",
    exp: "Учитель математики",
    desc: "Ведущий преподаватель математики, подготовка к олимпиадам и экзаменам",
    imageUrl: "/images/teachers/dilafruz.jpg"
  },
  {
    name: "Нигора Усмановна",
    subject: "Английский язык",
    exp: "Зав. кафедры английского языка",
    desc: "Учитель и зав. кафедры английского языка, международные стандарты",
    imageUrl: "/images/teachers/nigora.jpg"
  },
  {
    name: "Альбина Николаевна",
    subject: "Начальные классы",
    exp: "Классный руководитель младшей школы",
    desc: "Сильный преподаватель начального образования, индивидуальный подход",
    imageUrl: "/images/teachers/albina.jpg"
  }
];

export default function Teachers({
  subtitle = "НАША СИЛА — НАШИ ПРЕПОДАВАТЕЛИ",
  title = "Опытные наставники, вдохновляющие на успех",
  teamLink = "/teachers",
  items = DEFAULT_TEACHERS
}) {
  const [teachersList, setTeachersList] = useState(items);

  useEffect(() => {
    async function loadDynamicTeachers() {
      // 1. Check local cache first for instant reactivity
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("ngs_custom_teachers");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setTeachersList(parsed.slice(0, 4));
            }
          }
        } catch (e) {}
      }

      // 2. Query remote API
      try {
        const res = await teachersService.getTeachers();
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setTeachersList(res.data.slice(0, 4));
        }
      } catch (err) {
        // Fallback to provided props or local list
      }
    }

    loadDynamicTeachers();
  }, []);

  const resolveImageUrl = (url, idx) => {
    const fallbackPhotos = [
      "/images/teachers/galina.jpg",
      "/images/teachers/dilafruz.jpg",
      "/images/teachers/nigora.jpg",
      "/images/teachers/albina.jpg",
    ];

    if (!url) return fallbackPhotos[idx % fallbackPhotos.length];
    if (url.startsWith("/images/") || url.startsWith("data:") || url.startsWith("http")) {
      return url;
    }
    if (url.startsWith("/")) {
      const apiBase = process.env.NEXT_PUBLIC_API_URL 
        ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") 
        : "https://new-generation-school.onrender.com";
      return apiBase + url;
    }
    return url;
  };

  return (
    <Box as="section" id="teachers" py={16} px={{ base: 4, sm: 6, md: 12 }} maxW="7xl" mx="auto">
      <Flex justify="space-between" align="flex-end" mb={12} flexWrap="wrap" gap={4}>
        <Box maxW="2xl">
          <Text as="span" display="block" color="#FFB800" fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wider" mb={2}>
            {subtitle}
          </Text>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="#002045">
            {title}
          </Heading>
        </Box>
        <Link href={teamLink}>
          <Flex align="center" color="#002045" fontWeight="bold" fontSize="sm" _hover={{ color: "#D4AF37" }}>
            Вся команда 
            <Box as="span" className="material-symbols-outlined" ml={1} fontSize="sm">arrow_forward</Box>
          </Flex>
        </Link>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {teachersList.map((item, idx) => {
          const finalImageUrl = resolveImageUrl(item.imageUrl, idx);

          return (
            <GridItem key={item.id || idx}>
              <Box 
                bg="white" 
                border="1px solid rgba(0, 32, 69, 0.08)" 
                borderRadius="0" 
                overflow="hidden" 
                boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.04)"
                display="flex"
                flexDirection="column"
                h="full"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 35px -10px rgba(0, 32, 69, 0.1)",
                  borderColor: "rgba(255, 184, 0, 0.35)",
                }}
              >
                {/* Photo container */}
                <Box
                  position="relative"
                  w="full"
                  h="380px"
                  bg="gray.100"
                  overflow="hidden"
                  sx={{
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "35%",
                      background: "linear-gradient(to top, rgba(0, 32, 69, 0.5) 0%, transparent 100%)",
                      pointerEvents: "none",
                    }
                  }}
                >
                  <img
                    src={finalImageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top center",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/teachers/galina.jpg";
                    }}
                  />
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    bg="rgba(0, 32, 69, 0.85)"
                    backdropFilter="blur(4px)"
                    color="#FFB800"
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    zIndex={2}
                  >
                    {item.subject}
                  </Box>
                </Box>

                {/* Content info */}
                <VStack
                  align="flex-start"
                  p={6}
                  spacing={3}
                  flex={1}
                  bg="white"
                  justify="space-between"
                >
                  <Box w="full">
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="bold"
                      color="#002045"
                      mb={1}
                    >
                      {item.name}
                    </Heading>
                    <Text
                      fontSize="xs"
                      color="#64748B"
                      fontWeight="semibold"
                      mb={3}
                      letterSpacing="wide"
                    >
                      {item.role || item.exp || "Преподаватель"}
                    </Text>
                    <Text
                      color="#475569"
                      fontSize="sm"
                      lineHeight="tall"
                      noOfLines={3}
                    >
                      {item.desc}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
