"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, VStack } from "@chakra-ui/react";

export default function Features({
  subtitle = "Почему выбирают нас",
  title = "Сильная академическая база и забота",
  description = "Мы помогаем ученикам развивать академические знания, критическое мышление, творчество и самостоятельность.",
  items = [
    {
      title: "Сильная академическая база",
      text: "Глубокое изучение предметов, подготовка к олимпиадам и международным экзаменам.",
      icon: "workspace_premium",
    },
    {
      title: "Современная среда",
      text: "Интерактивные классы, цифровые ресурсы и технологии, которые делают обучение эффективным.",
      icon: "architecture",
    },
    {
      title: "Развитие личности",
      text: "Проектная работа, творчество, спорт и лидерские программы для всестороннего развития.",
      icon: "extension",
    },
    {
      title: "Безопасность и забота",
      text: "Безопасная среда, внимательное отношение и поддержка каждого ребенка.",
      icon: "verified_user",
    },
  ]
}) {
  return (
    <Box as="section" id="features" py={{ base: 14, md: 20 }} px={{ base: 4, sm: 6, md: 12 }} maxW="7xl" mx="auto" position="relative">
      <Box id="about" position="absolute" top="-100px" />
      
      {/* Section Header */}
      <Box textAlign={{ base: "left", md: "center" }} mb={{ base: 10, md: 16 }} maxW="3xl" mx="auto">
        <Flex 
          display="inline-flex" 
          align="center" 
          gap={2} 
          px={4} 
          py={1.5} 
          rounded="full" 
          bg="rgba(255, 184, 0, 0.12)" 
          border="1px solid rgba(255, 184, 0, 0.25)"
          mb={4}
        >
          <Box as="span" className="material-symbols-outlined" color="#D4AF37" fontSize="sm">
            star
          </Box>
          <Text 
            as="span" 
            color="#002045" 
            fontWeight="bold" 
            fontSize="xs" 
            letterSpacing="wider" 
            textTransform="uppercase"
          >
            {subtitle || "Почему New Generation"}
          </Text>
        </Flex>

        <Heading 
          as="h2" 
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }} 
          fontWeight="800" 
          color="#002045" 
          lineHeight="1.15"
          letterSpacing="tight"
          mb={4}
        >
          {title || "Школа, где образование работает на будущее"}
        </Heading>

        <Text 
          color="#64748B" 
          fontSize={{ base: "sm", sm: "md", md: "lg" }} 
          lineHeight="relaxed"
          maxW="2xl"
          mx="auto"
        >
          {description || "Мы помогаем ученикам развивать академические знания, критическое мышление, творчество и самостоятельность в безопасной и вдохновляющей среде."}
        </Text>
      </Box>

      {/* Features Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 5, md: 6 }}
      >
        {items.map((item, idx) => (
          <GridItem key={idx}>
            <Box
              bg="rgba(255, 255, 255, 0.85)"
              backdropFilter="blur(20px)"
              p={{ base: 6, md: 8 }}
              rounded="3xl"
              boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.05)"
              border="1px solid rgba(0, 32, 69, 0.08)"
              h="full"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              position="relative"
              role="group"
              _hover={{ 
                boxShadow: "0 20px 35px -10px rgba(0, 32, 69, 0.12)", 
                transform: "translateY(-6px)",
                borderColor: "rgba(255, 184, 0, 0.4)",
                bg: "white"
              }}
            >
              <VStack align="flex-start" spacing={5} w="full">
                {/* Icon in Card */}
                <Flex
                  w={14}
                  h={14}
                  rounded="2xl"
                  bg="#002045"
                  align="center"
                  justify="center"
                  boxShadow="0 8px 16px -4px rgba(0, 32, 69, 0.25)"
                  transition="transform 0.3s"
                  _groupHover={{ transform: "scale(1.05)" }}
                >
                  <Box as="span" className="material-symbols-outlined" color="#FFB800" fontSize="2xl">
                    {item.icon}
                  </Box>
                </Flex>

                <Box>
                  <Heading 
                    as="h3" 
                    fontSize={{ base: "lg", md: "xl" }} 
                    fontWeight="bold" 
                    color="#002045" 
                    mb={2.5}
                    lineHeight="1.3"
                  >
                    {item.title}
                  </Heading>
                  <Text color="#64748B" fontSize="sm" lineHeight="relaxed">
                    {item.text}
                  </Text>
                </Box>
              </VStack>

              {/* Bottom Subtle Accent Bar */}
              <Box 
                mt={6} 
                h="2px" 
                w="24px" 
                bg="#002045" 
                opacity={0.15} 
                rounded="full"
                transition="all 0.3s"
                _groupHover={{ w: "48px", bg: "#FFB800", opacity: 1 }}
              />
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
