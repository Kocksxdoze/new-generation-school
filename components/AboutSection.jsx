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

export default function AboutSection() {
  return (
    <Box
      as="section"
      id="about"
      py={24}
      position="relative"
      overflow="hidden"
      bg="white"
    >
      <Box maxW="7xl" mx="auto" px={{ base: 6, md: 12 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={16}
          alignItems="center"
        >
          <VStack align="stretch" gap={8}>
            <Box>
              <Text
                as="span"
                display="block"
                color="#FFB800"
                fontWeight="bold"
                letterSpacing="wider"
                textTransform="uppercase"
                fontSize="sm"
                mb={2}
              >
                О нас
              </Text>
              <Heading
                as="h2"
                fontFamily="heading"
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="bold"
                color="primaryNavy"
                mb={6}
                lineHeight={"1.1"}
              >
                Лучший выбор для будущего
              </Heading>
              <Text color="#64748B" fontSize="lg" lineHeight="relaxed" mb={8}>
                Выбирая нашу школу, вы получаете опытных педагогов, которые
                учитывают потребности каждого ученика. Мы используем передовые
                методики и качественные материалы, обеспечивая превосходный
                уровень образования.
              </Text>
            </Box>

            <Grid
              templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
              gap={6}
            >
              <Flex
                align="flex-start"
                gap={4}
                p={4}
                rounded="2xl"
                bg="#f8fafc"
                borderColor="borderLight"
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  color="blue.600"
                  bg="blue.50"
                  p={2}
                  rounded="xl"
                >
                  psychology
                </Box>
                <Box>
                  <Text fontWeight="bold" color="primaryNavy">
                    Профессионалы
                  </Text>
                  <Text fontSize="sm" color="#64748B" mt={1}>
                    Квалифицированный состав
                  </Text>
                </Box>
              </Flex>
              <Flex
                align="flex-start"
                gap={4}
                p={4}
                rounded="2xl"
                bg={"#f8fafc"}
                borderColor="borderLight"
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  color="green.600"
                  bg="green.50"
                  p={2}
                  rounded="xl"
                >
                  restaurant
                </Box>
                <Box>
                  <Text fontWeight="bold" color="primaryNavy">
                    Питание
                  </Text>
                  <Text fontSize="sm" color="#64748B" mt={1}>
                    Здоровое 3-х разовое
                  </Text>
                </Box>
              </Flex>
            </Grid>
          </VStack>

          <Box position="relative">
            <Box
              className="apple-card"
              p={12}
              bgGradient="linear(to-br, surfaceLight, white)"
              textAlign="center"
            >
              <Flex
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={"100px"}
                h={"100px"}
                rounded="full"
                bg={"#002045"}
                mb={6}
                boxShadow="xl"
                mx="auto"
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  color="#FFB800"
                  fontSize={"50px !important"}
                >
                  verified
                </Box>
              </Flex>
              <Heading
                as="h3"
                fontFamily="heading"
                fontSize="6xl"
                fontWeight="extrabold"
                color="primaryNavy"
                mb={4}
              >
                100%
              </Heading>
              <Text fontSize="xl" color={"#64748b"} fontWeight="medium">
                Индивидуальный подход к каждому ученику, обеспечивающий
                максимальное вовлечение и успех.
              </Text>
            </Box>
            <Box
              position="absolute"
              zIndex={-10}
              top="50%"
              right="-12"
              w={64}
              h={64}
              bg="rgba(255,184,0,0.1)"
              rounded="full"
              filter="blur(64px)"
              transform="translateY(-50%)"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
