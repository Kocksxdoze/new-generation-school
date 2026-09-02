"use client";

import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { universities } from "../data/universities";

export default function Universities() {
  return (
    <Box as="section" py={10} bg="#111827" color="white" position="relative">
      <Box maxW="7xl" mx="auto" px={{ base: 6, md: 12 }}>
        <Box textAlign="center" mb={16}>
          <HStack
            display="inline-flex"
            gap={2}
            px={4}
            py={1.5}
            rounded="full"
            border="1px solid rgba(255,255,255,0.2)"
            bg="rgba(255,255,255,0.05)"
            backdropFilter="blur(4px)"
            mb={6}
          >
            <Box
              as="span"
              className="material-symbols-outlined"
              color="#fdbb31"
              fontSize="sm"
            >
              school
            </Box>
            <Text fontSize="sm" fontWeight="medium">
              98% поступления в вузы — и это не предел
            </Text>
          </HStack>
          <Heading
            as="h2"
            fontFamily="heading"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            mb={6}
          >
            Куда поступают наши выпускники
          </Heading>
          <Text color="gray.400" fontSize="lg" maxW="3xl" mx="auto">
            От Москвы до Лондона, от Сиднея до Гонконга — выпускники New
            Generation School получают места в топ-100 университетах мира.
          </Text>
        </Box>

        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={4}
        >
          {universities.map((u) => (
            <Flex
              key={u.name}
              bg="rgba(255,255,255,0.05)"
              border="1px solid rgba(255,255,255,0.1)"
              rounded="2xl"
              p={6}
              direction="column"
              align="center"
              justify="center"
              textAlign="center"
              transition="colors 0.2s"
              _hover={{ bg: "rgba(255,255,255,0.1)" }}
            >
              <Flex
                w={12}
                h={12}
                rounded="lg"
                bg={u.bg}
                align="center"
                justify="center"
                mb={4}
                fontSize="xl"
                fontWeight="bold"
              >
                {u.type === "text" ? (
                  u.label
                ) : (
                  <Box
                    as="span"
                    className="material-symbols-outlined"
                    color={u.iconColor}
                  >
                    account_balance
                  </Box>
                )}
              </Flex>
              <Text fontWeight="bold" fontSize="sm" mb={1}>
                {u.name}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {u.city}
              </Text>
            </Flex>
          ))}

          {/* Тизер-карточка */}
          <Flex
            border="2px dashed"
            borderColor="rgba(255,184,0,0.5)"
            rounded="2xl"
            p={6}
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
            bg="rgba(255,184,0,0.05)"
          >
            <Flex
              w={12}
              h={12}
              rounded="full"
              bg="rgba(255,184,0,0.2)"
              align="center"
              justify="center"
              mb={4}
              color="#fdbb31"
              fontWeight="bold"
              fontSize="xl"
            >
              ?
            </Flex>
            <Text fontWeight="bold" fontSize="sm" mb={1} color="#fdbb31">
              Куда поступит ваш ребенок?
            </Text>
            <Text fontSize="xs" color="gray.400" fontStyle="italic">
              Список продолжает расти
            </Text>
          </Flex>
        </Grid>

        <Box mt={12} textAlign="center">
          <ChakraLink
            href="#"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={6}
            py={3}
            bg="rgba(255,255,255,0.1)"
            color="white"
            fontWeight="medium"
            fontSize="sm"
            rounded="full"
            border="1px solid rgba(255,255,255,0.2)"
            transition="colors 0.2s"
            _hover={{ bg: "rgba(255,255,255,0.2)", textDecoration: "none" }}
          >
            Смотреть все результаты выпускников
            <Box
              as="span"
              className="material-symbols-outlined"
              ml={2}
              fontSize="sm"
            >
              arrow_forward
            </Box>
          </ChakraLink>
        </Box>
      </Box>
    </Box>
  );
}
