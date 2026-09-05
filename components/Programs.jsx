"use client";

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Programs({
  subtitle = "НАШИ ПРОГРАММЫ",
  title = "Образование на каждом этапе развития",
  description = "Мы сопровождаем ученика на протяжении всего школьного пути — от первых шагов в обучении до поступления в университет.",
  items = [
    {
      title: "Pre-school",
      age: "5-6 лет",
      text: "Играя познаем мир, развиваем речь, мышление и социальные навыки.",
      imageUrl: "/uploads/1_w91El1j.jpg",
      tag: "01",
      link: "#",
    },
    {
      title: "Начальная школа",
      age: "1-4 классы",
      text: "Формируем прочную базу знаний и любовь к обучению.",
      imageUrl: "/uploads/1_9DRnJR0.jpg",
      tag: "02",
      link: "#",
    },
    {
      title: "Средняя школа",
      age: "5-9 классы",
      text: "Углубляем знания, развиваем критическое мышление и самостоятельность.",
      imageUrl: "/uploads/3_leXEOVP.jpg",
      tag: "03",
      link: "#",
    },
    {
      title: "Старшая школа",
      age: "10-11 классы",
      text: "Подготовка к поступлению в лучшие университеты мира и взрослой жизни.",
      imageUrl: "/uploads/1_8CletkE.jpg",
      tag: "04",
      link: "#",
    },
  ],
}) {
  return (
    <Box
      as="section"
      id="programs"
      py={16}
      px={{ base: 6, md: 12 }}
      maxW="7xl"
      mx="auto"
    >
      <Flex
        justify="space-between"
        align="flex-end"
        mb={12}
        flexWrap="wrap"
        gap={4}
      >
        <Box maxW="2xl">
          <Text
            as="span"
            display="block"
            color="#ffb800"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wider"
            mb={2}
          >
            {subtitle}
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="#002045"
          >
            {title}
          </Heading>
        </Box>
        <Link href="/programs">
          <Flex
            align="center"
            color="#002045"
            fontWeight="medium"
            _hover={{ color: "blue.600" }}
          >
            Все программы
            <Box
              as="span"
              className="material-symbols-outlined"
              ml={1}
              fontSize="sm"
            >
              arrow_forward
            </Box>
          </Flex>
        </Link>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {items.map((item, idx) => {
          // Resolve image URL (prepend API URL if it's a relative path from backend)
          const finalImageUrl = item.imageUrl
            ? item.imageUrl.startsWith("/")
              ? (process.env.NEXT_PUBLIC_API_URL
                  ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
                  : "http://localhost:4000") + item.imageUrl
              : item.imageUrl
            : "/bg.png";

          return (
            <GridItem key={idx}>
              <Box
                bg="white"
                rounded="2xl"
                overflow="hidden"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
                h="full"
                transition="all 0.3s"
                _hover={{ boxShadow: "md", transform: "translateY(-4px)" }}
                display="flex"
                flexDirection="column"
              >
                <Box position="relative" h="200px" w="full">
                  <Box
                    as="img"
                    src={finalImageUrl}
                    alt={item.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={4}
                    bg={
                      idx === 0
                        ? "orange.400"
                        : idx === 1
                          ? "red.400"
                          : idx === 2
                            ? "purple.400"
                            : "blue.600"
                    }
                    color="white"
                    px={3}
                    py={1}
                    borderBottomRadius="md"
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    {item.tag || `0${idx + 1}`}
                  </Box>
                </Box>
                <VStack align="flex-start" p={6} spacing={4} flex={1}>
                  <Flex justify="space-between" w="full" align="center">
                    <Heading
                      as="h3"
                      fontSize="xl"
                      fontWeight="bold"
                      color="#002045"
                    >
                      {item.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                      {item.age}
                    </Text>
                  </Flex>
                  <Text color="#64748B" fontSize="sm" flex={1}>
                    {item.text}
                  </Text>
                  <Link href={item.link || "#"}>
                    <Flex
                      align="center"
                      color="#002045"
                      fontWeight="bold"
                      fontSize="sm"
                      mt={2}
                      _hover={{ color: "blue.600" }}
                    >
                      Подробнее
                      <Box
                        as="span"
                        className="material-symbols-outlined"
                        ml={1}
                        fontSize="sm"
                      >
                        arrow_forward
                      </Box>
                    </Flex>
                  </Link>
                </VStack>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
