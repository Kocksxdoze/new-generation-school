"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import Link from 'next/link';

import { useState } from 'react';

function UniversityBadge({ name, bg }) {
  const norm = (name || "").toLowerCase();

  if (norm.includes("harvard")) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3h16v10c0 5.5-4 8.5-8 10-4-1.5-8-4.5-8-10V3z" fill="#A51C30" />
        <rect x="6.5" y="5.5" width="4.5" height="3.5" rx="0.5" fill="#FFFFFF" />
        <rect x="13" y="5.5" width="4.5" height="3.5" rx="0.5" fill="#FFFFFF" />
        <rect x="9.7" y="11" width="4.5" height="3.5" rx="0.5" fill="#FFFFFF" />
        <path d="M7.5 7h2.5M14 7h2.5M10.7 12.5h2.5" stroke="#A51C30" strokeWidth="0.8" />
      </svg>
    );
  }
  if (norm.includes("oxford")) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3h16v10c0 5.5-4 8.5-8 10-4-1.5-8-4.5-8-10V3z" fill="#002147" />
        <path d="M6.5 8c1.8-.7 3.5-.7 5.5 1 2-1.7 3.7-1.7 5.5-1v6c-1.8-.7-3.5-.7-5.5 1-2-1.7-3.7-1.7-5.5-1v-6z" fill="#FFFFFF" />
        <path d="M12 4.5l1 1.5h-2l1-1.5zM8 15.5l1 1.2H7l1-1.2zM16 15.5l1 1.2h-2l1-1.2z" fill="#FFB800" />
      </svg>
    );
  }
  if (norm.includes("stanford")) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3h16v10c0 5.5-4 8.5-8 10-4-1.5-8-4.5-8-10V3z" fill="#8C1515" />
        <path d="M12 4.5l-2.8 4.2h1.6l-3.2 5h2.2l-3.8 6.3h12L14.2 13.7h2.2l-3.2-5h1.6L12 4.5z" fill="#FFFFFF" />
        <rect x="11.2" y="19" width="1.6" height="2.5" fill="#FFFFFF" />
      </svg>
    );
  }
  if (norm.includes("cambridge")) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3h16v10c0 5.5-4 8.5-8 10-4-1.5-8-4.5-8-10V3z" fill="#D6083B" />
        <path d="M12 3v19M4 10h16" stroke="#FFB800" strokeWidth="1.5" />
        <rect x="8.5" y="7" width="7" height="6" rx="1" fill="#FFFFFF" />
        <path d="M10 9h4M10 11h3" stroke="#D6083B" strokeWidth="1" />
      </svg>
    );
  }
  if (norm.includes("mit")) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <rect width="24" height="24" rx="5" fill="#7B1113" />
        <rect x="4" y="5" width="3" height="14" rx="0.5" fill="#FFFFFF" />
        <rect x="9" y="8" width="3" height="11" rx="0.5" fill="#A2AAAD" />
        <rect x="14" y="5" width="3" height="14" rx="0.5" fill="#FFFFFF" />
        <rect x="19" y="8" width="2.5" height="11" rx="0.5" fill="#FFFFFF" />
        <rect x="19" y="5" width="2.5" height="2.5" rx="0.5" fill="#FFFFFF" />
      </svg>
    );
  }
  if (norm.includes("yale")) {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
        <path d="M4 3h16v10c0 5.5-4 8.5-8 10-4-1.5-8-4.5-8-10V3z" fill="#00356B" />
        <rect x="6.5" y="6" width="11" height="8.5" rx="1" fill="#FFFFFF" />
        <path d="M8.5 8h7M8.5 10.2h7M8.5 12.5h5" stroke="#00356B" strokeWidth="0.9" />
      </svg>
    );
  }
  // Generic Academic Crest
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      <path d="M4 3h16v10c0 5.5-4 8.5-8 10-4-1.5-8-4.5-8-10V3z" fill={bg || "#002045"} />
      <path d="M12 6l-6 3.5 6 3.5 6-3.5L12 6z" fill="#FFB800" />
      <path d="M8 12.5v3c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5v-3" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  );
}

export default function Alumni({
  subtitle = "НАШИ ВЫПУСКНИКИ",
  title = "Поступают в ведущие университеты мира",
  description = "2022-2026 - 146 выпускников",
  allLink = "#",
  logos = [
    { name: "WIUT", city: "Ташкент", bg: "blue.500", type: "text", label: "W", iconColor: "white" },
    { name: "MDIS", city: "Сингапур / Ташкент", bg: "red.500", type: "text", label: "M", iconColor: "white" },
    { name: "INHA", city: "Южная Корея / Ташкент", bg: "cyan.500", type: "text", label: "I", iconColor: "white" },
    { name: "KIMEP", city: "Казахстан", bg: "purple.500", type: "text", label: "K", iconColor: "white" },
    { name: "BUC", city: "Лондон / Ташкент", bg: "green.500", type: "icon", label: "account_balance", iconColor: "white" },
    { name: "TPU", city: "Россия", bg: "orange.500", type: "icon", label: "account_balance", iconColor: "white" }
  ],
  reviews = [
    {
      text: "Школа дала мне не только знания, но и уверенность в себе. Поддержка учителей и атмосфера здесь помогли мне поступить в университет моей мечты.",
      name: "Собир Рахимов",
      desc: "Выпуск 2024, University of Westminster",
      imageUrl: "/uploads/bg.png"
    },
    {
      text: "Благодаря проектной работе и командным кейсам я научилась мыслить шире и работать в команде. Это бесценно.",
      name: "Мадина Юсупова",
      desc: "Выпуск 2023, MDIS Singapore",
      imageUrl: "/uploads/bg.png"
    }
  ]
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Box as="section" id="alumni" py={{ base: 12, md: 16 }} px={{ base: 4, sm: 6, md: 12 }} maxW="7xl" mx="auto" overflow="hidden">
      <Grid 
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} 
        gap={{ base: 8, lg: 10 }} 
        bg="#002045" 
        p={{ base: 5, sm: 8, md: 12 }} 
        rounded={{ base: "2xl", md: "3xl" }} 
        color="white"
        w="full"
        overflow="hidden"
      >
        
        {/* Left: Info & Logos */}
        <GridItem minW="0" w="full" display="flex" flexDirection="column" justifyContent="space-between">
          <Box mb={8}>
            <Text as="span" display="block" color="#ffb800" fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wider" mb={2}>
              {subtitle}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" mb={2}>
              {title}
            </Heading>
            <Text color="gray.400" fontSize="sm">
              {description}
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 2, sm: 3 }} gap={4} mb={8}>
            {logos.map((logo, idx) => (
              <Flex 
                key={idx} 
                direction="column" 
                align="center" 
                justify="center" 
                bg="rgba(255,255,255,0.05)" 
                border="1px solid rgba(255,255,255,0.1)" 
                rounded="xl" 
                p={4} 
                textAlign="center"
              >
                <Flex
                  w={12}
                  h={12}
                  rounded="xl"
                  bg="rgba(255,255,255,0.06)"
                  align="center"
                  justify="center"
                  mb={3}
                  p={1.5}
                  boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                >
                  <UniversityBadge name={logo.name} bg={logo.bg} />
                </Flex>
                <Text fontWeight="bold" fontSize="xs" mb={1} lineHeight="1.1">
                  {logo.name}
                </Text>
                <Text fontSize="2xs" color="gray.400" lineHeight="1.1">
                  {logo.city}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>

          <Box>
            <Box 
              as={Link} 
              href={allLink} 
              display="inline-flex" 
              alignItems="center" 
              border="1px solid"
              borderColor="rgba(255,255,255,0.3)"
              color="white" 
              px={6} 
              py={2.5} 
              rounded="full"
              fontWeight="bold"
              fontSize="sm"
              transition="all 0.2s"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            >
              Все университеты <Box as="span" className="material-symbols-outlined" ml={2} fontSize="sm">arrow_forward</Box>
            </Box>
          </Box>
        </GridItem>

        {/* Right: Reviews (Slider) */}
        <GridItem minW="0" w="full" position="relative" display="flex" alignItems="center" overflow="hidden">
          <Box w="full" position="relative" overflow="hidden" rounded="2xl">
            <Flex
              transition="transform 0.5s ease"
              transform={`translateX(-${currentSlide * 100}%)`}
              w="full"
            >
              {reviews.map((review, idx) => {
                const studentAvatars = [
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><defs><linearGradient id='sg1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23002147'/><stop offset='100%' stop-color='%23004080'/></linearGradient></defs><circle cx='40' cy='40' r='40' fill='url(%23sg1)'/><circle cx='40' cy='31' r='13' fill='%23FFD8A8'/><path d='M21 72c0-12 9-18 19-18s19 6 19 18' fill='%23FFB800'/><path d='M30 23c3-5 17-5 20 0-2 2-6 1-10 1s-8 1-10-1z' fill='%232B1810'/></svg>",
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><defs><linearGradient id='sg2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23A51C30'/><stop offset='100%' stop-color='%23E02A45'/></linearGradient></defs><circle cx='40' cy='40' r='40' fill='url(%23sg2)'/><circle cx='40' cy='32' r='12.5' fill='%23FFE0B2'/><path d='M23 72c0-11 8-17 17-17s17 6 17 17' fill='%23FFFFFF'/><path d='M26 26c2-6 26-6 28 0 1 8-2 14-4 17-2-3-4-8-4-8s-12 1-16-1c-2 3-3 8-4 9z' fill='%231F1610'/></svg>",
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><defs><linearGradient id='sg3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2300356B'/><stop offset='100%' stop-color='%231B65A8'/></linearGradient></defs><circle cx='40' cy='40' r='40' fill='url(%23sg3)'/><circle cx='40' cy='31' r='13' fill='%23FFCCA0'/><path d='M21 72c0-12 9-18 19-18s19 6 19 18' fill='%23F1F5F9'/><path d='M28 23c3-5 21-5 24 0-3 2-7 1-12 1s-9 1-12-1z' fill='%231A202C'/></svg>",
                ];
                const hasCustomImg = review.imageUrl && !review.imageUrl.includes("bg.png");
                const finalImg = hasCustomImg 
                  ? (review.imageUrl.startsWith("/") ? (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "https://new-generation-school.onrender.com") + review.imageUrl : review.imageUrl)
                  : studentAvatars[idx % studentAvatars.length];
                  
                return (
                  <Box key={idx} flex="0 0 100%" maxW="100%" px={{ base: 1, sm: 2 }} minW="0">
                    <Box 
                      bg="white" 
                      rounded="2xl" 
                      p={{ base: 5, sm: 8 }} 
                      color="#002045" 
                      display="flex" 
                      flexDirection="column" 
                      h="full" 
                      minH={{ base: "260px", sm: "300px" }}
                      position="relative"
                    >
                      <Box as="span" className="material-symbols-outlined" color="#ffb800" fontSize={{ base: "3xl", sm: "4xl" }} mb={3}>
                        format_quote
                      </Box>
                      <Text fontSize={{ base: "sm", sm: "md" }} lineHeight="tall" color="gray.600" mb={6} flex={1}>
                        {review.text}
                      </Text>
                      <Flex align="center" justify="space-between" pr={reviews.length > 1 ? 24 : 0}>
                        <Flex align="center" gap={3}>
                          <Box 
                            as="img" 
                            src={finalImg} 
                            w={10} 
                            h={10} 
                            rounded="full" 
                            objectFit="cover" 
                            flexShrink={0}
                          />
                          <Box minW="0">
                            <Text fontSize="sm" fontWeight="bold" isTruncated>{review.name}</Text>
                            <Text fontSize="xs" color="gray.500" isTruncated>{review.desc}</Text>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </Flex>
            
            {/* Slider Controls */}
            {reviews.length > 1 && (
              <Flex position="absolute" bottom={{ base: 5, sm: 8 }} right={{ base: 5, sm: 8 }} gap={2} zIndex={5}>
                <Flex 
                  align="center" justify="center" w={9} h={9} rounded="full" bg="#f1f5f9" color="#002045" cursor="pointer"
                  _hover={{ bg: "#e2e8f0" }}
                  onClick={() => setCurrentSlide(prev => (prev === 0 ? reviews.length - 1 : prev - 1))}
                  transition="background 0.2s"
                >
                  <Box as="span" className="material-symbols-outlined" fontSize="sm">arrow_back</Box>
                </Flex>
                <Flex 
                  align="center" justify="center" w={9} h={9} rounded="full" bg="#002045" color="white" cursor="pointer"
                  _hover={{ bg: "#001530" }}
                  onClick={() => setCurrentSlide(prev => (prev === reviews.length - 1 ? 0 : prev + 1))}
                  transition="background 0.2s"
                >
                  <Box as="span" className="material-symbols-outlined" fontSize="sm">arrow_forward</Box>
                </Flex>
              </Flex>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
