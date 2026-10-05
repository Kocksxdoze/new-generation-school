"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import Link from 'next/link';

export default function Teachers({
  subtitle = "НАША СИЛА — НАШИ ПРЕПОДАВАТЕЛИ",
  title = "Опытные наставники, вдохновляющие на успех",
  teamLink = "#",
  items = [
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
  ]
}) {
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
        {items.map((item, idx) => {
          const fallbackPhotos = [
            "/images/teachers/galina.jpg",
            "/images/teachers/dilafruz.jpg",
            "/images/teachers/nigora.jpg",
            "/images/teachers/albina.jpg",
          ];
          const hasCustomPhoto = item.imageUrl && !item.imageUrl.includes("bg.png");
          const finalImageUrl = hasCustomPhoto 
            ? (item.imageUrl.startsWith("/images/") 
                ? item.imageUrl 
                : (item.imageUrl.startsWith("/") ? (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "https://new-generation-school.onrender.com") + item.imageUrl : item.imageUrl))
            : fallbackPhotos[idx % fallbackPhotos.length];

          return (
            <GridItem key={idx}>
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
                {/* Photo Top (Zero border-radius) */}
                <Box w="full" h={{ base: "320px", sm: "340px", md: "380px" }} bg="gray.100" overflow="hidden" borderRadius="0">
                  <Box
                    as="img"
                    src={finalImageUrl}
                    alt={item.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                    objectPosition="top center"
                    borderRadius="0"
                    transition="transform 0.4s ease"
                    _hover={{ transform: "scale(1.03)" }}
                  />
                </Box>
                {/* Info Bottom (Zero border-radius) */}
                <Box p={5} display="flex" flexDirection="column" justifyContent="space-between" flex={1} borderRadius="0" bg="white">
                  <Box mb={2}>
                    <Text fontSize="xs" fontWeight="bold" color="#FFB800" textTransform="uppercase" letterSpacing="wider" mb={1}>
                      {item.subject}
                    </Text>
                    <Heading as="h4" fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="#002045" mb={1} lineHeight="1.3">
                      {item.name}
                    </Heading>
                    <Text fontSize="xs" fontWeight="semibold" color="#64748B" mb={2}>
                      {item.exp}
                    </Text>
                  </Box>
                  <Text fontSize="xs" color="#94A3B8" lineHeight="1.5">
                    {item.desc}
                  </Text>
                </Box>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
