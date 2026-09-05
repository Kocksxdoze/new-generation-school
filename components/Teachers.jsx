"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import Link from 'next/link';

export default function Teachers({
  subtitle = "НАША СИЛА — НАШИ ПРЕПОДАВАТЕЛИ",
  title = "Опытные наставники, вдохновляющие на успех",
  teamLink = "#",
  items = [
    {
      name: "Даврон Абдуллаев",
      subject: "Математика",
      exp: "12 лет опыта",
      desc: "Тренер олимпиадных команд",
      imageUrl: "/uploads/bg.png"
    },
    {
      name: "Мария Иванова",
      subject: "Английский язык",
      exp: "IELTS 8.5",
      desc: "Международный сертификат CELTA, DELTA",
      imageUrl: "/uploads/bg.png"
    },
    {
      name: "Отабек Каримов",
      subject: "Физика",
      exp: "15 лет опыта",
      desc: "Подготовка к международным олимпиадам",
      imageUrl: "/uploads/bg.png"
    },
    {
      name: "Нигина Арслонова",
      subject: "Биология",
      exp: "10 лет опыта",
      desc: "Проектная и исследовательская деятельность",
      imageUrl: "/uploads/bg.png"
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
          const finalImageUrl = item.imageUrl 
            ? (item.imageUrl.startsWith("/") ? (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "https://new-generation-school.onrender.com") + item.imageUrl : item.imageUrl)
            : "/bg.png";

          return (
            <GridItem key={idx}>
              <Box 
                bg="rgba(255,255,255,0.85)" 
                backdropFilter="blur(16px)"
                border="1px solid rgba(0, 32, 69, 0.08)" 
                rounded="3xl" 
                overflow="hidden" 
                boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.04)"
                display="flex"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 35px -10px rgba(0, 32, 69, 0.1)",
                  borderColor: "rgba(255, 184, 0, 0.3)",
                }}
              >
                {/* Photo Left */}
                <Box w="40%" minW="100px" bg="gray.100">
                  <Box
                    as="img"
                    src={finalImageUrl}
                    alt={item.name}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
                {/* Info Right */}
                <Box w="60%" p={4} display="flex" flexDirection="column" justifyContent="center">
                  <Heading as="h4" fontSize="sm" fontWeight="bold" color="#002045" mb={1}>
                    {item.name}
                  </Heading>
                  <Text fontSize="xs" color="gray.500" mb={1}>{item.subject}</Text>
                  <Text fontSize="xs" color="gray.500" mb={2}>{item.exp}</Text>
                  <Text fontSize="xs" color="gray.400" lineHeight="1.4">
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
