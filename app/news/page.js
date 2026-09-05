"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  Input,
  Button,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AllNewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

  const categories = [
    { id: "all", label: "Все публикации" },
    { id: "Новость", label: "Новости" },
    { id: "Мероприятие", label: "Мероприятия" },
    { id: "Олимпиада", label: "Олимпиады" },
    { id: "Достижения", label: "Достижения" },
  ];

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://new-generation-school.onrender.com/api";
        const query = new URLSearchParams({
          page: String(page),
          pageSize: "9",
        });

        if (selectedCategory !== "all") {
          query.set("category", selectedCategory);
        }
        if (search.trim()) {
          query.set("search", search.trim());
        }

        const res = await fetch(`${apiUrl}/news?${query.toString()}`);
        if (res.ok) {
          const json = await res.json();
          setNews(json.data || []);
          setMeta(json.meta || { page: 1, totalPages: 1, total: 0 });
        }
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadNews();
    }, 250);

    return () => clearTimeout(timer);
  }, [page, selectedCategory, search]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Box minH="100vh" bg="#FDFBF7" display="flex" flexDirection="column">
      <Navbar />

      {/* Hero Header */}
      <Box
        pt={{ base: 32, md: 36 }}
        pb={{ base: 12, md: 16 }}
        px={{ base: 4, sm: 6, md: 12 }}
        textAlign="center"
        bg="linear-gradient(180deg, rgba(0, 32, 69, 0.04) 0%, rgba(253, 251, 247, 0) 100%)"
      >
        <Box maxW="4xl" mx="auto">
          <Flex
            display="inline-flex"
            align="center"
            gap={2}
            px={4}
            py={1.5}
            rounded="full"
            bg="rgba(255, 184, 0, 0.15)"
            border="1px solid rgba(255, 184, 0, 0.3)"
            mb={4}
          >
            <Box as="span" className="material-symbols-outlined" color="#D4AF37" fontSize="sm">
              newspaper
            </Box>
            <Text
              as="span"
              color="#002045"
              fontWeight="bold"
              fontSize="xs"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              События и новости школы
            </Text>
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="800"
            color="#002045"
            lineHeight="1.15"
            letterSpacing="tight"
            mb={4}
          >
            Жизнь New Generation School
          </Heading>

          <Text color="#64748B" fontSize={{ base: "sm", md: "lg" }} maxW="2xl" mx="auto">
            Следите за ключевыми событиями, академическими победами, поездками и важными объявлениями нашей школы.
          </Text>
        </Box>
      </Box>

      {/* Filter and Search Bar */}
      <Box maxW="7xl" mx="auto" w="full" px={{ base: 4, sm: 6, md: 12 }} mb={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          gap={4}
          bg="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(16px)"
          p={4}
          rounded="2xl"
          border="1px solid rgba(0, 32, 69, 0.08)"
          boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.04)"
        >
          {/* Category Tabs */}
          <HStack spacing={2} overflowX="auto" py={1}>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  size="sm"
                  rounded="full"
                  px={4}
                  fontWeight="bold"
                  fontSize="xs"
                  bg={isSelected ? "#002045" : "transparent"}
                  color={isSelected ? "white" : "#64748B"}
                  _hover={{
                    bg: isSelected ? "#001530" : "rgba(0, 32, 69, 0.05)",
                    color: isSelected ? "white" : "#002045",
                  }}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setPage(1);
                  }}
                >
                  {cat.label}
                </Button>
              );
            })}
          </HStack>

          {/* Search Box */}
          <Box w={{ base: "full", md: "320px" }} position="relative">
            <Box
              as="span"
              className="material-symbols-outlined"
              position="absolute"
              left="14px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              fontSize="sm"
              zIndex={2}
              pointerEvents="none"
            >
              search
            </Box>
            <Input
              placeholder="Поиск по новостям..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              size="sm"
              pl="38px"
              rounded="full"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              _focus={{ borderColor: "#FFB800", boxShadow: "0 0 0 1px #FFB800" }}
            />
          </Box>
        </Flex>
      </Box>

      {/* Main Content Grid */}
      <Box maxW="7xl" mx="auto" w="full" px={{ base: 4, sm: 6, md: 12 }} flex={1} pb={16}>
        {loading ? (
          <Flex justify="center" align="center" minH="300px">
            <Spinner size="xl" color="#002045" thickness="4px" />
          </Flex>
        ) : news.length === 0 ? (
          <Box
            textAlign="center"
            py={16}
            px={4}
            bg="white"
            rounded="3xl"
            border="1px solid rgba(0, 32, 69, 0.06)"
          >
            <Box
              as="span"
              className="material-symbols-outlined"
              fontSize="5xl"
              color="#D4AF37"
              mb={4}
              display="block"
            >
              find_in_page
            </Box>
            <Heading as="h3" fontSize="xl" color="#002045" mb={2}>
              Новостей не найдено
            </Heading>
            <Text color="#64748B" fontSize="sm" maxW="md" mx="auto">
              Попробуйте изменить категорию или поисковый запрос.
            </Text>
          </Box>
        ) : (
          <>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {news.map((item) => {
                const finalImageUrl = item.coverImage
                  ? (item.coverImage.startsWith("/")
                      ? (process.env.NEXT_PUBLIC_API_URL
                          ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
                          : "https://new-generation-school.onrender.com") + item.coverImage
                      : item.coverImage)
                  : "/bg.png";

                const newsHref = item.externalUrl || `/news/${item.slug || item.id}`;

                return (
                  <GridItem key={item.id}>
                    <Box
                      as="article"
                      bg="white"
                      rounded="3xl"
                      overflow="hidden"
                      border="1px solid rgba(0, 32, 69, 0.08)"
                      boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.04)"
                      h="full"
                      display="flex"
                      flexDirection="column"
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      role="group"
                      _hover={{
                        transform: "translateY(-6px)",
                        boxShadow: "0 20px 35px -10px rgba(0, 32, 69, 0.12)",
                        borderColor: "rgba(255, 184, 0, 0.4)",
                      }}
                    >
                      {/* Image Frame */}
                      <Box position="relative" h="220px" w="full" overflow="hidden" bg="gray.100">
                        <Box
                          as="img"
                          src={finalImageUrl}
                          alt={item.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                          transition="transform 0.5s"
                          _groupHover={{ transform: "scale(1.05)" }}
                        />
                        {/* Category Badge */}
                        <Box
                          position="absolute"
                          top={4}
                          left={4}
                          bg="rgba(0, 32, 69, 0.85)"
                          backdropFilter="blur(8px)"
                          color="white"
                          fontSize="2xs"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="wider"
                          px={3}
                          py={1}
                          rounded="full"
                        >
                          {item.category || "Новость"}
                        </Box>
                      </Box>

                      {/* Content */}
                      <VStack align="flex-start" spacing={3} p={6} flex={1} justify="space-between">
                        <Box w="full">
                          <Text fontSize="xs" color="#D4AF37" fontWeight="bold" mb={2}>
                            {formatDate(item.date || item.createdAt)}
                          </Text>

                          <Heading
                            as="h3"
                            fontSize="lg"
                            fontWeight="bold"
                            color="#002045"
                            lineHeight="1.3"
                            mb={2}
                            noOfLines={2}
                          >
                            {item.title}
                          </Heading>

                          <Text fontSize="sm" color="#64748B" lineHeight="relaxed" noOfLines={3}>
                            {item.excerpt || item.body?.replace(/<[^>]*>?/gm, "").substring(0, 120) || ""}
                          </Text>
                        </Box>

                        <Box pt={3} w="full" borderTop="1px solid" borderColor="gray.100">
                          <Link href={newsHref} style={{ textDecoration: "none" }}>
                            <Flex
                              align="center"
                              justify="space-between"
                              color="#002045"
                              fontWeight="bold"
                              fontSize="sm"
                              _hover={{ color: "#D4AF37" }}
                              transition="color 0.2s"
                            >
                              <Text>Читать полностью</Text>
                              <Box as="span" className="material-symbols-outlined" fontSize="sm">
                                arrow_forward
                              </Box>
                            </Flex>
                          </Link>
                        </Box>
                      </VStack>
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>

            {/* Pagination Controls */}
            {meta.totalPages > 1 && (
              <Flex justify="center" align="center" gap={2} mt={12}>
                <Button
                  size="sm"
                  variant="outline"
                  rounded="full"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  borderColor="gray.300"
                  color="#002045"
                  _hover={{ bg: "gray.100" }}
                >
                  <Box as="span" className="material-symbols-outlined" fontSize="sm">
                    chevron_left
                  </Box>
                  Назад
                </Button>

                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    rounded="full"
                    w={9}
                    h={9}
                    p={0}
                    bg={p === page ? "#002045" : "white"}
                    color={p === page ? "white" : "#002045"}
                    border="1px solid"
                    borderColor={p === page ? "#002045" : "gray.200"}
                    _hover={{ bg: p === page ? "#001530" : "gray.50" }}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}

                <Button
                  size="sm"
                  variant="outline"
                  rounded="full"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                  borderColor="gray.300"
                  color="#002045"
                  _hover={{ bg: "gray.100" }}
                >
                  Вперед
                  <Box as="span" className="material-symbols-outlined" fontSize="sm">
                    chevron_right
                  </Box>
                </Button>
              </Flex>
            )}
          </>
        )}
      </Box>

      <Footer />
    </Box>
  );
}
