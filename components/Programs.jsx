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
      title: "Дошколята",
      age: "5-7 лет",
      text: "Играя познаем мир, развиваем речь, логику, творчество и мягкую социализацию перед школой.",
      imageUrl: "/images/programs/preschool.jpg",
      tag: "01",
      link: "/programs",
    },
    {
      title: "Начальная школа",
      age: "1-4 классы",
      text: "Закладываем прочную академическую базу, любознательность и осознанную любовь к обучению.",
      imageUrl: "/images/programs/primary.jpg",
      tag: "02",
      link: "/programs",
    },
    {
      title: "Средняя школа",
      age: "5-9 классы",
      text: "Углубляем знания, развиваем критическое мышление, командные проекты и олимпиадные навыки.",
      imageUrl: "/images/programs/middle.jpg",
      tag: "03",
      link: "/programs",
    },
    {
      title: "Старшая школа",
      age: "10-11 классы",
      text: "Интенсивная подготовка к международным экзаменам, олимпиадам и поступлению в топовые вузы мира.",
      imageUrl: "/images/programs/high.jpg",
      tag: "04",
      link: "/programs",
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
          const title = (item?.title || "").toLowerCase();
          let finalImageUrl = "/images/programs/preschool.jpg";
          if (title.includes("дошкол") || idx === 0) {
            finalImageUrl = "/images/programs/preschool.jpg";
          } else if (title.includes("начальн") || idx === 1) {
            finalImageUrl = "/images/programs/primary.jpg";
          } else if (title.includes("средн") || idx === 2) {
            finalImageUrl = "/images/programs/middle.jpg";
          } else if (title.includes("старш") || idx === 3) {
            finalImageUrl = "/images/programs/high.jpg";
          }

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
                </VStack>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
