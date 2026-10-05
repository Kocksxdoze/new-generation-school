"use client";

import { Box, Flex, SimpleGrid, Heading, Text, VStack, HStack, Button, Spinner, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { newsService, pagesService, mediaService, applicationsService, teachersService } from '@/utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    news: 0,
    pages: 1,
    media: 0,
    applications: 0,
    newApplications: 0,
    teachers: 10,
    universities: 12,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const results = await Promise.allSettled([
          newsService.getAllNews(),
          pagesService.getAllPages(),
          mediaService.getAllMedia(),
          applicationsService.getAllApplications(),
          teachersService.getAllAdmin(),
        ]);

        const newsRes = results[0].status === 'fulfilled' ? results[0].value : null;
        const pagesRes = results[1].status === 'fulfilled' ? results[1].value : null;
        const mediaRes = results[2].status === 'fulfilled' ? results[2].value : null;
        const appsRes = results[3].status === 'fulfilled' ? results[3].value : null;
        const teachersRes = results[4].status === 'fulfilled' ? results[4].value : null;

        const apps = appsRes?.data || [];
        const newApps = apps.filter((a) => a.status === 'NEW').length;

        // Custom universities count from localStorage if available
        let uniCount = 12;
        if (typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('ngs_custom_universities');
            if (stored) uniCount = JSON.parse(stored).length;
          } catch (e) {}
        }

        setStats({
          news: newsRes?.data?.length || 4,
          pages: pagesRes?.data?.length || 1,
          media: mediaRes?.data?.length || 0,
          applications: apps.length,
          newApplications: newApps,
          teachers: teachersRes?.data?.length || 10,
          universities: uniCount,
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
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <VStack align="stretch" spacing={8}>
      <Box bg="white" p={6} rounded="2xl" border="1px solid" borderColor="gray.100" boxShadow="sm">
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Box>
            <HStack spacing={2} mb={1}>
              <Badge bg="#002045" color="white" px={2.5} py={0.5} rounded="md">
                NGS Admin Center
              </Badge>
              <Text fontSize="xs" color="gray.500">
                Защищенный шлюз управления
              </Text>
            </HStack>
            <Heading size="lg" color="#002045" mb={1}>
              Панель управления школой
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Контроль заявок родителей, педагогического состава, вузов и медиа-контента
            </Text>
          </Box>

          <Button
            as={Link}
            href="/admin/guide"
            bg="#002045"
            color="white"
            size="sm"
            _hover={{ bg: "#003366" }}
          >
            <HStack spacing={1.5}>
              <Box as="span" className="material-symbols-outlined" fontSize="sm">
                menu_book
              </Box>
              <Text>Открыть руководство</Text>
            </HStack>
          </Button>
        </Flex>
      </Box>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
        <Box
          as={Link}
          href="/admin/applications"
          p={6}
          bg="white"
          boxShadow="sm"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">Заявки родителей</Text>
            {stats.newApplications > 0 && (
              <Badge bg="red.500" color="white" px={2} py={0.5} rounded="full" fontSize="xs">
                +{stats.newApplications} новых
              </Badge>
            )}
          </Flex>
          <Text fontSize="3xl" fontWeight="bold" color="#002045">{stats.applications}</Text>
          <Text fontSize="xs" color="blue.600" mt={1}>Обработка лидов →</Text>
        </Box>

        <Box
          as={Link}
          href="/admin/teachers"
          p={6}
          bg="white"
          boxShadow="sm"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={2}>Педагогический состав</Text>
          <Text fontSize="3xl" fontWeight="bold" color="#002045">{stats.teachers}</Text>
          <Text fontSize="xs" color="blue.600" mt={1}>Учителя и кафедры →</Text>
        </Box>

        <Box
          as={Link}
          href="/admin/universities"
          p={6}
          bg="white"
          boxShadow="sm"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={2}>Университеты</Text>
          <Text fontSize="3xl" fontWeight="bold" color="#002045">{stats.universities}</Text>
          <Text fontSize="xs" color="blue.600" mt={1}>Гранты и вузы →</Text>
        </Box>

        <Box
          as={Link}
          href="/admin/news"
          p={6}
          bg="white"
          boxShadow="sm"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          <Text fontSize="sm" fontWeight="medium" color="gray.500" mb={2}>Новости школы</Text>
          <Text fontSize="3xl" fontWeight="bold" color="#002045">{stats.news}</Text>
          <Text fontSize="xs" color="blue.600" mt={1}>Статьи и анонсы →</Text>
        </Box>
      </SimpleGrid>

      {/* Quick Navigation Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        <Box
          as={Link}
          href="/admin/gallery"
          p={6}
          bg="white"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="sm"
          _hover={{ borderColor: "blue.300", transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          <Flex align="center" gap={3} mb={3}>
            <Box w={10} h={10} rounded="xl" bg="purple.50" color="purple.600" display="flex" align="center" justify="center">
              <Box as="span" className="material-symbols-outlined" fontSize="22px">photo_library</Box>
            </Box>
            <Heading size="sm" color="#002045">Галерея кампуса</Heading>
          </Flex>
          <Text fontSize="xs" color="gray.600">
            Загрузка фото оборудования, классов, спортзала и автовоспроизводимых видеороликов.
          </Text>
        </Box>

        <Box
          as={Link}
          href="/admin/pages"
          p={6}
          bg="white"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="sm"
          _hover={{ borderColor: "blue.300", transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          <Flex align="center" gap={3} mb={3}>
            <Box w={10} h={10} rounded="xl" bg="blue.50" color="blue.600" display="flex" align="center" justify="center">
              <Box as="span" className="material-symbols-outlined" fontSize="22px">view_quilt</Box>
            </Box>
            <Heading size="sm" color="#002045">Блоки страниц</Heading>
          </Flex>
          <Text fontSize="xs" color="gray.600">
            Управление разделами главной страницы, изменение порядка и скрытие блоков.
          </Text>
        </Box>

        <Box
          as={Link}
          href="/admin/guide"
          p={6}
          bg="white"
          rounded="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="sm"
          _hover={{ borderColor: "blue.300", transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          <Flex align="center" gap={3} mb={3}>
            <Box w={10} h={10} rounded="xl" bg="green.50" color="green.600" display="flex" align="center" justify="center">
              <Box as="span" className="material-symbols-outlined" fontSize="22px">menu_book</Box>
            </Box>
            <Heading size="sm" color="#002045">Инструкция</Heading>
          </Flex>
          <Text fontSize="xs" color="gray.600">
            Пошаговые алгоритмы работы с админ-панелью для штатных администраторов школы.
          </Text>
        </Box>
      </SimpleGrid>
    </VStack>
  );
}
