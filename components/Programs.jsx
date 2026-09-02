"use client";

import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { programs } from "../data/programs";

export default function Programs() {
  return (
    <Box
      as="section"
      id="programs"
      py={24}
      px={{ base: 6, md: 12 }}
      maxW="7xl"
      mx="auto"
    >
      <Box textAlign="center" mb={16}>
        <Text
          as="span"
          display="block"
          color="#ffb800"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
          fontSize="sm"
          mb={2}
        >
          НАЙДИТЕ ПРОГРАММУ ДЛЯ ВАШЕГО РЕБЕНКА
        </Text>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="bold"
          color="#002045"
          maxW="3xl"
          mx="auto"
          lineHeight="1.1"
        >
          Каждый возраст, продуман до мелочей
        </Heading>
        <Text color="#64748B" mt={4} maxW="2xl" mx="auto" fontSize="lg">
          Четыре этапа от первых шагов до готовности к университету — выберите
          возрастную группу вашего ребенка, чтобы изучить учебную программу,
          распорядок дня и систему поддержки.
        </Text>
      </Box>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {programs.map((p) => (
          <Flex
            key={p.title}
            rounded="3xl"
            p={8}
            direction="column"
            h="full"
            bg={p.bg}
            color="white"
            transition="transform 0.3s"
            boxShadow="premium"
            _hover={{ transform: "translateY(-8px)" }}
          >
            <Flex
              w={12}
              h={12}
              rounded="full"
              bg="rgba(255,255,255,0.2)"
              align="center"
              justify="center"
              mb={6}
              backdropFilter="blur(4px)"
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                color="white"
              >
                {p.icon}
              </Box>
            </Flex>
            <Text
              display="inline-block"
              px={3}
              py={1}
              bg="rgba(255,255,255,0.2)"
              rounded="full"
              fontSize="sm"
              fontWeight="medium"
              mb={4}
              w="fit-content"
            >
              {p.age}
            </Text>
            <Heading
              as="h3"
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
            >
              {p.title}
            </Heading>
            <Text
              color="rgba(255,255,255,0.8)"
              flexGrow={1}
              mb={8}
              fontSize="sm"
              lineHeight="relaxed"
            >
              {p.text}
            </Text>
            <ChakraLink
              href="#"
              display="inline-flex"
              alignItems="center"
              fontWeight="bold"
              fontSize="sm"
              role="group"
              color={"white"}
              _hover={{ color: "accentGold", textDecoration: "none" }}
            >
              Изучить программу
              <Box
                as="span"
                className="material-symbols-outlined"
                ml={2}
                color={"white"}
                fontSize="sm"
                transition="transform 0.2s"
                _groupHover={{ transform: "translateX(4px)" }}
              >
                arrow_forward
              </Box>
            </ChakraLink>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
}
