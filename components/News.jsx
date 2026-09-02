"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { news } from "../data/news";

export default function News() {
  return (
    <Box
      as="section"
      id="news"
      py={20}
      px={{ base: 6, md: 12 }}
      maxW="7xl"
      mx="auto"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ md: "flex-end" }}
        mb={16}
        gap={6}
      >
        <Box>
          <Text
            as="span"
            display="block"
            color="#fdbb31"
            fontWeight="bold"
            letterSpacing="wider"
            textTransform="uppercase"
            fontSize="sm"
            mb={2}
          >
            Блог и Новости
          </Text>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            color="#002045"
          >
            Будьте в курсе событий
          </Heading>
        </Box>
        <ChakraLink
          href="/news"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          px={6}
          py={3}
          bg="white"
          color="#002045"
          fontWeight="bold"
          fontSize="sm"
          rounded="full"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="sm"
          transition="colors 0.2s"
          _hover={{ borderColor: "#002045", textDecoration: "none" }}
        >
          Все новости
          <Box
            as="span"
            className="material-symbols-outlined"
            ml={2}
            fontSize="sm"
          >
            arrow_forward
          </Box>
        </ChakraLink>
      </Flex>

      <VStack align="stretch" gap={6}>
        {news.map((n) => (
          <Flex
            key={n.title}
            as="article"
            role="group"
            className="apple-card"
            p={6}
            direction={{ base: "column", md: "row" }}
            gap={8}
            align="center"
            cursor="pointer"
          >
            <Box
              w={{ base: "full", md: "25%" }}
              h={{ base: 32, md: 40 }}
              rounded="2xl"
              bg={n.iconBg}
              overflow="hidden"
              position="relative"
              flexShrink={0}
            >
              <Flex
                position="absolute"
                inset={0}
                align="center"
                justify="center"
                transition="transform 0.5s"
                _groupHover={{ transform: "scale(1.1)" }}
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="5xl"
                  color={n.iconColor}
                >
                  {n.icon}
                </Box>
              </Flex>
            </Box>
            <Box w={{ base: "full", md: "75%" }}>
              <HStack
                gap={4}
                fontSize="xs"
                fontWeight="medium"
                color="#64748B"
                mb={3}
              >
                <Text
                  as="span"
                  bg="surfaceLight"
                  px={3}
                  py={1}
                  rounded="full"
                  border="1px solid"
                  borderColor="borderLight"
                >
                  {n.date}
                </Text>
                <HStack gap={1}>
                  <Box
                    as="span"
                    className="material-symbols-outlined"
                    fontSize="14px"
                  >
                    person
                  </Box>
                  <Text as="span">Администратор</Text>
                </HStack>
              </HStack>
              <Heading
                as="h3"
                fontFamily="heading"
                fontSize="2xl"
                fontWeight="bold"
                color="#002045"
                mb={2}
                transition="colors 0.2s"
                _groupHover={{ color: n.hoverColor }}
              >
                {n.title}
              </Heading>
              <Text color="#64748B" mb={4} noOfLines={2}>
                {n.text}
              </Text>
              <ChakraLink
                href="#"
                color="#002045"
                fontWeight="bold"
                fontSize="sm"
                display="flex"
                alignItems="center"
                _groupHover={{ color: n.hoverColor }}
              >
                Подробнее
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  ml={1}
                  fontSize="sm"
                >
                  arrow_outward
                </Box>
              </ChakraLink>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
