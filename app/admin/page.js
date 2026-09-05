"use client";

import { Box, SimpleGrid, Heading, Text, VStack, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { newsService, pagesService, mediaService } from '@/utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ news: 0, pages: 0, media: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, pagesRes, mediaRes] = await Promise.all([
          newsService.getAllNews(),
          pagesService.getAllPages(),
          mediaService.getAllMedia()
        ]);
        
        setStats({
          news: newsRes?.data?.length || 0,
          pages: pagesRes?.data?.length || 0,
          media: mediaRes?.data?.length || 0,
        });
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <Spinner size="xl" color="blue.500" />;
  }

  return (
    <VStack align="stretch" spacing={8}>
      <Box>
        <Heading size="lg" mb={2}>Панель управления</Heading>
        <Text color="gray.600">Добро пожаловать в административную панель сайта NGS.</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box p={6} bg="white" shadow="sm" borderRadius="md" borderWidth="1px">
          <Text fontSize="lg" color="gray.500">Всего новостей</Text>
          <Text fontSize="4xl" fontWeight="bold">{stats.news}</Text>
          <Text fontSize="sm" color="gray.400">Опубликованных и черновиков</Text>
        </Box>

        <Box p={6} bg="white" shadow="sm" borderRadius="md" borderWidth="1px">
          <Text fontSize="lg" color="gray.500">Динамических страниц</Text>
          <Text fontSize="4xl" fontWeight="bold">{stats.pages}</Text>
          <Text fontSize="sm" color="gray.400">Управляемые через админку</Text>
        </Box>

        <Box p={6} bg="white" shadow="sm" borderRadius="md" borderWidth="1px">
          <Text fontSize="lg" color="gray.500">Медиафайлов</Text>
          <Text fontSize="4xl" fontWeight="bold">{stats.media}</Text>
          <Text fontSize="sm" color="gray.400">Изображения и документы</Text>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
