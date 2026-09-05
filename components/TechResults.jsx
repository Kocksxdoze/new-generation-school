"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, VStack, SimpleGrid } from "@chakra-ui/react";
import Link from 'next/link';

export default function TechResults({
  techSubtitle = "СОВРЕМЕННАЯ СРЕДА",
  techTitle = "Технологии, которые усиливают обучение",
  techItems = [
    { title: "Интерактивные панели", text: "Windows-среда и сенсорное управление", icon: "tv" },
    { title: "Цифровые ресурсы", text: "Доступ к учебным материалам 24/7", icon: "devices" },
    { title: "Совместная работа", text: "Проекты и командная работа в классе", icon: "group" },
    { title: "Индивидуальный подход", text: "Аналитика прогресса каждого ученика", icon: "analytics" },
  ],
  techLinkUrl = "#",
  
  resultsSubtitle = "НАШИ ДОСТИЖЕНИЯ",
  resultsTitle = "Результаты, которыми мы гордимся",
  resultsItems = [
    { value: "100%", label: "поступление в университеты" },
    { value: "68%", label: "выпускников получают гранты и стипендии" },
    { value: "120+", label: "победителей и призёров олимпиад" },
    { value: "20+", label: "международных сертификатов" },
  ]
}) {
  return (
    <Box as="section" py={16} px={{ base: 6, md: 12 }} maxW="7xl" mx="auto">
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        
        {/* Left Side: Tech (Dark) */}
        <GridItem>
          <Box bg="#002045" color="white" p={{ base: 8, md: 12 }} rounded="2xl" h="full" display="flex" flexDirection="column">
            <Text as="span" display="block" color="#ffb800" fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wider" mb={2}>
              {techSubtitle}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" mb={10}>
              {techTitle}
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={8} mb={10} flex={1}>
              {techItems.map((item, idx) => (
                <VStack key={idx} align="flex-start" spacing={3}>
                  <Box p={2} border="1px solid" borderColor="rgba(255,255,255,0.2)" rounded="lg">
                    <Box as="span" className="material-symbols-outlined" fontSize="xl">
                      {item.icon}
                    </Box>
                  </Box>
                  <Box>
                    <Heading as="h4" fontSize="md" fontWeight="bold" mb={1}>
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.400" lineHeight="tall">
                      {item.text}
                    </Text>
                  </Box>
                </VStack>
              ))}
            </SimpleGrid>

            <Box>
              <Box 
                as={Link} 
                href={techLinkUrl} 
                display="inline-flex" 
                alignItems="center" 
                bg="#cf9b15" 
                color="white" 
                px={6} 
                py={3} 
                rounded="full"
                fontWeight="bold"
                fontSize="sm"
                transition="all 0.2s"
                _hover={{ bg: "#b58712" }}
              >
                Посмотреть нашу школу <Box as="span" className="material-symbols-outlined" ml={2} fontSize="sm">arrow_forward</Box>
              </Box>
            </Box>
          </Box>
        </GridItem>

        {/* Right Side: Results (Light) */}
        <GridItem>
          <Box bg="white" border="1px solid" borderColor="gray.200" p={{ base: 8, md: 12 }} rounded="2xl" h="full" display="flex" flexDirection="column">
            <Text as="span" display="block" color="#ffb800" fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wider" mb={2}>
              {resultsSubtitle}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="#002045" mb={10}>
              {resultsTitle}
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6} flex={1}>
              {resultsItems.map((item, idx) => (
                <Box key={idx} p={6} border="1px solid" borderColor="gray.100" rounded="xl" bg="gray.50" textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <Heading as="h3" fontSize={{ base: "4xl", md: "5xl" }} fontWeight="800" color="#002045" mb={2}>
                    {item.value}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" maxW="xs">
                    {item.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </GridItem>

      </Grid>
    </Box>
  );
}
