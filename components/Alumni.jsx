"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import Link from 'next/link';

import { useState } from 'react';

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
                  w={10}
                  h={10}
                  rounded="lg"
                  bg={logo.bg || "blue.500"}
                  align="center"
                  justify="center"
                  mb={3}
                  fontSize="md"
                  fontWeight="bold"
                >
                  {logo.type === "text" ? (
                    logo.label || logo.name.charAt(0)
                  ) : (
                    <Box as="span" className="material-symbols-outlined" color={logo.iconColor || "white"} fontSize="md">
                      {logo.label || "account_balance"}
                    </Box>
                  )}
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
                const finalImg = review.imageUrl 
                  ? (review.imageUrl.startsWith("/") ? (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "http://localhost:4000") + review.imageUrl : review.imageUrl)
                  : "/bg.png";
                  
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
