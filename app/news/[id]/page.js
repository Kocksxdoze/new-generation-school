"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SingleNewsPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!params?.id) return;
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://new-generation-school.onrender.com/api";
        const res = await fetch(`${apiUrl}/news/${params.id}`);
        if (res.ok) {
          const json = await res.json();
          setArticle(json.data || null);
        } else {
          setArticle(null);
        }
      } catch (err) {
        console.error("Failed to load article", err);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [params?.id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const finalImageUrl = article?.coverImage
    ? (article.coverImage.startsWith("/")
        ? (process.env.NEXT_PUBLIC_API_URL
            ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
            : "https://new-generation-school.onrender.com") + article.coverImage
        : article.coverImage)
    : "/bg.png";

  return (
    <Box minH="100vh" bg="#EEF2F6" display="flex" flexDirection="column">
      <Navbar />

      <Box pt={{ base: 28, md: 36 }} pb={20} px={{ base: 4, sm: 6, md: 12 }} flex={1}>
        <Box maxW="4xl" mx="auto">
          {/* Back link */}
          <Box mb={8}>
            <Link href="/news" style={{ textDecoration: "none" }}>
              <Flex
                align="center"
                gap={2}
                display="inline-flex"
                color="#002045"
                fontWeight="bold"
                fontSize="sm"
                px={4}
                py={2}
                rounded="full"
                bg="white"
                border="1px solid rgba(0, 32, 69, 0.08)"
                boxShadow="sm"
                _hover={{ bg: "gray.50", transform: "translateX(-2px)" }}
                transition="all 0.2s"
              >
                <Box as="span" className="material-symbols-outlined" fontSize="sm">
                  arrow_back
                </Box>
                Все события
              </Flex>
            </Link>
          </Box>

          {loading ? (
            <Flex justify="center" align="center" minH="350px">
              <Spinner size="xl" color="#002045" thickness="4px" />
            </Flex>
          ) : !article ? (
            <Box
              textAlign="center"
              py={16}
              px={6}
              bg="white"
              rounded="3xl"
              border="1px solid rgba(0, 32, 69, 0.06)"
            >
              <Box as="span" className="material-symbols-outlined" fontSize="5xl" color="#D4AF37" mb={4} display="block">
                article
              </Box>
              <Heading as="h2" fontSize="2xl" color="#002045" mb={3}>
                Новость не найдена
              </Heading>
              <Text color="#64748B" mb={6}>
                Возможно, эта публикация была удалена или перенесена.
              </Text>
              <Button
                as={Link}
                href="/news"
                bg="#002045"
                color="white"
                rounded="full"
                _hover={{ bg: "#001530" }}
              >
                Вернуться к списку новостей
              </Button>
            </Box>
          ) : (
            <Box as="article">
              {/* Meta tags */}
              <Flex align="center" gap={3} mb={4} wrap="wrap">
                <Box
                  bg="rgba(0, 32, 69, 0.08)"
                  color="#002045"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  px={3.5}
                  py={1}
                  rounded="full"
                >
                  {article.category || "Новость"}
                </Box>
                <Text fontSize="sm" color="#64748B" fontWeight="medium">
                  {formatDate(article.date || article.createdAt)}
                </Text>
              </Flex>

              {/* Title */}
              <Heading
                as="h1"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="800"
                color="#002045"
                lineHeight="1.2"
                letterSpacing="tight"
                mb={6}
              >
                {article.title}
              </Heading>

              {/* Excerpt if present */}
              {article.excerpt && (
                <Text
                  fontSize={{ base: "md", md: "xl" }}
                  color="#64748B"
                  lineHeight="relaxed"
                  mb={8}
                  fontWeight="medium"
                >
                  {article.excerpt}
                </Text>
              )}

              {/* Cover Image */}
              {article.coverImage && (
                <Box
                  rounded="3xl"
                  overflow="hidden"
                  mb={10}
                  boxShadow="0 10px 30px -10px rgba(0, 32, 69, 0.12)"
                  border="1px solid rgba(0, 32, 69, 0.08)"
                  maxH="500px"
                  bg="gray.100"
                >
                  <Box
                    as="img"
                    src={finalImageUrl}
                    alt={article.title}
                    w="full"
                    h="full"
                    maxH="500px"
                    objectFit="cover"
                  />
                </Box>
              )}

              {/* Article Content */}
              <Box
                bg="white"
                p={{ base: 6, sm: 8, md: 12 }}
                rounded="3xl"
                border="1px solid rgba(0, 32, 69, 0.06)"
                boxShadow="0 4px 20px -2px rgba(0, 32, 69, 0.03)"
                fontSize={{ base: "md", md: "lg" }}
                color="#334155"
                lineHeight="tall"
                whiteSpace="pre-line"
              >
                {article.body}
              </Box>

              {/* Share & Apply CTA */}
              <Box
                mt={12}
                p={{ base: 6, md: 8 }}
                rounded="3xl"
                bg="#002045"
                color="white"
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                alignItems="center"
                justifyContent="space-between"
                gap={6}
              >
                <Box textAlign={{ base: "center", sm: "left" }}>
                  <Text fontSize="lg" fontWeight="bold" mb={1}>
                    Хотите учиться в New Generation School?
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    Запишитесь на консультацию и индивидуальную экскурсию по школе.
                  </Text>
                </Box>
                <Button
                  as={Link}
                  href="/apply"
                  bg="#FFB800"
                  color="#002045"
                  fontWeight="bold"
                  rounded="full"
                  px={8}
                  py={6}
                  _hover={{ bg: "#e6a600" }}
                  flexShrink={0}
                >
                  Подать заявку
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
