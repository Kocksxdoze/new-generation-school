"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Badge,
  Text,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { newsService } from "@/utils/api";
import AdminToast, { useAdminToast } from "@/components/admin/AdminToast";

export default function AdminNewsList() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast, toastData } = useAdminToast();

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const res = await newsService.getAllNews({ pageSize: 100 });
      setNews(res.data || []);
    } catch (error) {
      toast({
        title: "Не удалось загрузить новости",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Вы действительно хотите удалить новость "${title}"?`)) return;

    try {
      await newsService.deleteNews(id);
      toast({
        title: "Новость удалена",
        status: "info",
        duration: 2500,
      });
      fetchNews();
    } catch (error) {
      toast({
        title: "Ошибка при удалении новости",
        status: "error",
        duration: 3000,
      });
    }
  };

  const filteredNews = news.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <Heading size="lg" color="#002045">Новости и публикации</Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            Управление новостной лентой, статьями, олимпиадными достижениями
          </Text>
        </Box>
        <Link href="/admin/news/create" passHref legacyBehavior>
          <Button
            as="a"
            colorScheme="blue"
            bg="#002045"
            color="white"
            _hover={{ bg: "#003366" }}
            leftIcon={<span className="material-symbols-outlined">add</span>}
          >
            Добавить новость
          </Button>
        </Link>
      </Flex>

      <Box bg="white" p={6} borderRadius="2xl" shadow="sm" border="1px solid" borderColor="gray.200">
        <Flex mb={6} gap={4}>
          <Box position="relative" maxW="400px" w="full">
            <Box
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              zIndex={1}
            >
              <span className="material-symbols-outlined" style={{ color: "#A0AEC0", fontSize: "20px" }}>search</span>
            </Box>
            <Input
              pl="40px"
              placeholder="Поиск по заголовку или категории..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rounded="xl"
            />
          </Box>
        </Flex>

        {isLoading ? (
          <Flex justify="center" p={12}><Spinner size="xl" color="blue.500" /></Flex>
        ) : (
          <Box overflowX="auto">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #EDF2F7" }}>
                  <th style={{ padding: "14px 16px", color: "#718096", fontSize: "12px", textTransform: "uppercase" }}>ID</th>
                  <th style={{ padding: "14px 16px", color: "#718096", fontSize: "12px", textTransform: "uppercase" }}>Заголовок</th>
                  <th style={{ padding: "14px 16px", color: "#718096", fontSize: "12px", textTransform: "uppercase" }}>Категория</th>
                  <th style={{ padding: "14px 16px", color: "#718096", fontSize: "12px", textTransform: "uppercase" }}>Дата</th>
                  <th style={{ padding: "14px 16px", color: "#718096", fontSize: "12px", textTransform: "uppercase" }}>Статус</th>
                  <th style={{ padding: "14px 16px", color: "#718096", fontSize: "12px", textTransform: "uppercase" }}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #EDF2F7",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F7FAFC")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: "600", color: "#A0AEC0", fontSize: "13px" }}>
                      #{item.id}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <Text fontWeight="bold" color="#002045" fontSize="sm" noOfLines={1}>
                        {item.title}
                      </Text>
                      {item.excerpt && (
                        <Text fontSize="xs" color="#718096" noOfLines={1}>
                          {item.excerpt}
                        </Text>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <Badge
                        px={2.5}
                        py={1}
                        rounded="full"
                        colorScheme={
                          item.category === "Олимпиада"
                            ? "orange"
                            : item.category === "Мероприятие"
                            ? "purple"
                            : "blue"
                        }
                        fontSize="2xs"
                      >
                        {item.category}
                      </Badge>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#4A5568" }}>
                      {new Date(item.date).toLocaleDateString("ru-RU")}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <Badge
                        px={2.5}
                        py={1}
                        rounded="full"
                        colorScheme={item.published ? "green" : "gray"}
                        fontSize="2xs"
                      >
                        {item.published ? "Опубликовано" : "Черновик"}
                      </Badge>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <HStack spacing={2}>
                        <Button
                          as={Link}
                          href={`/admin/news/edit/${item.id}`}
                          size="xs"
                          colorScheme="blue"
                          variant="outline"
                        >
                          Изменить
                        </Button>
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(item.id, item.title)}
                        >
                          Удалить
                        </Button>
                      </HStack>
                    </td>
                  </tr>
                ))}
                {filteredNews.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: "32px", textAlign: "center", color: "#A0AEC0" }}>
                      Новостей не найдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        )}
      </Box>
      <AdminToast toastData={toastData} />
    </Box>
  );
}
