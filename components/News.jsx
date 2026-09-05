"use client";

import { Box, Grid, GridItem, Heading, Text, Flex, VStack, Spinner } from "@chakra-ui/react";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function News({
  subtitle = "СОБЫТИЯ И НОВОСТИ",
  title = "Будьте в курсе школьной жизни",
  allLink = "/news",
  limit = 3,
}) {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const res = await fetch(`${apiUrl}/news?pageSize=${limit}&page=1`);
        if (res.ok) {
          const json = await res.json();
          setNewsList(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [limit]);

  // Format date helper
  const formatDateParts = (dateString) => {
    if (!dateString) return ["", ""];
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const months = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"];
    const month = months[date.getMonth()];
    return [day, month];
  };

  return (
    <Box as="section" id="news" py={16} px={{ base: 6, md: 12 }} maxW="7xl" mx="auto">
      <Flex justify="space-between" align="flex-end" mb={12} flexWrap="wrap" gap={4}>
        <Box maxW="2xl">
          <Text as="span" display="block" color="#ffb800" fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wider" mb={2}>
            {subtitle}
          </Text>
          <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" color="#002045">
            {title}
          </Heading>
        </Box>
        <Link href={allLink}>
          <Flex align="center" px={6} py={2.5} border="1px solid" borderColor="gray.200" rounded="full" color="#002045" fontWeight="bold" fontSize="sm" _hover={{ bg: "gray.50" }}>
            Все события
            <Box as="span" className="material-symbols-outlined" ml={2} fontSize="sm">arrow_forward</Box>
          </Flex>
        </Link>
      </Flex>

      <VStack spacing={6} align="stretch" w="full" mx="auto">
        {/* News Cards */}
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" color="#002045" />
          </Flex>
        ) : (
          newsList.map((item, idx) => {
            const finalImageUrl = item.coverImage 
              ? (item.coverImage.startsWith("/") ? (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "") : "http://localhost:4000") + item.coverImage : item.coverImage)
              : "/bg.png";
            
            const [day, month] = formatDateParts(item.date || item.createdAt);

            return (
              <Box 
                key={item.id || idx} 
                border="1px solid" 
                borderColor="white" 
                rounded="2xl" 
                overflow="hidden" 
                display="flex" 
                flexDirection={{ base: "column", md: "row" }} 
                bg="rgba(255,255,255,0.7)" 
                backdropFilter="blur(16px)"
                _hover={{ boxShadow: "md" }} 
                transition="box-shadow 0.2s"
              >
                <Box w={{ base: "100%", md: "30%" }} position="relative" minH={{ base: "200px", md: "auto" }}>
                  <Box
                    as="img"
                    src={finalImageUrl}
                    alt={item.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    position="absolute"
                    top={0}
                    left={0}
                  />
                  <Box position="absolute" top={4} left={4} bg="white" px={3} py={2} rounded="md" boxShadow="sm" textAlign="center">
                    <Text fontSize="sm" fontWeight="bold" color="#002045" lineHeight="1">{day}</Text>
                    <Text fontSize="xs" color="gray.500" lineHeight="1" mt={1}>{month}</Text>
                  </Box>
                </Box>
                <VStack w={{ base: "100%", md: "70%" }} p={6} align="flex-start" justify="center" spacing={3}>
                  <Heading as="h4" fontSize="lg" fontWeight="bold" color="#002045" lineHeight="1.3">
                    {item.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" noOfLines={3}>
                    {item.excerpt || item.body?.substring(0, 150) || "Нет описания"}
                  </Text>
                  <Link href={item.externalUrl ? item.externalUrl : `/news/${item.slug || item.id}`}>
                    <Flex align="center" color="#002045" fontWeight="bold" fontSize="sm" _hover={{ color: "blue.600" }} mt={2}>
                      Читать <Box as="span" className="material-symbols-outlined" ml={1} fontSize="sm">arrow_forward</Box>
                    </Flex>
                  </Link>
                </VStack>
              </Box>
            );
          })
        )}
      </VStack>
    </Box>
  );
}
