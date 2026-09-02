"use client";

import { Box, Grid, Heading, Text, Flex } from "@chakra-ui/react";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <Box
      as="section"
      id="testimonials"
      py={24}
      bg="surfaceLight"
      position="relative"
    >
      <Box maxW="7xl" mx="auto" px={{ base: 6, md: 12 }}>
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
              Отзывы
            </Text>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              color="primaryNavy"
              lineHeight={"1.1"}
            >
              Слова родителей <br />
              <Box as="span" fontSize="3xl" fontWeight="medium" color="#64748B">
                ключ к счастливым детям.
              </Box>
            </Heading>
          </Box>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {testimonials.map((t) =>
            t.variant === "dark" ? (
              <Box
                key={t.name}
                bg="#002045"
                color="white"
                rounded="2rem"
                p={8}
                boxShadow="premium"
                position="relative"
                transform={{ md: "translateY(-1rem)" }}
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  position="absolute"
                  top={8}
                  right={8}
                  fontSize="5xl"
                  color="rgba(255,255,255,0.1)"
                >
                  format_quote
                </Box>
                <Box position="relative" zIndex={10}>
                  <Text
                    color="blue.50"
                    lineHeight="relaxed"
                    mb={8}
                    minH="120px"
                  >
                    {t.text}
                  </Text>
                  <Flex
                    align="center"
                    gap={4}
                    pt={6}
                    borderTop="1px solid"
                    borderColor="rgba(255,255,255,0.1)"
                  >
                    <Flex
                      w={12}
                      h={12}
                      rounded="full"
                      align="center"
                      justify="center"
                      color={"black"}
                      bg={"#fdbb31"}
                      fontWeight="bold"
                      fontFamily="heading"
                    >
                      {t.avatarLetter}
                    </Flex>
                    <Box>
                      <Text as="h6" fontWeight="bold" color="white">
                        {t.name}
                      </Text>
                      <Text fontSize="xs" color="blue.200">
                        {t.role}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ) : (
              <Box
                key={t.name}
                className="apple-card"
                p={8}
                position="relative"
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  position="absolute"
                  top={8}
                  right={8}
                  fontSize="5xl"
                  color="gray.100"
                >
                  format_quote
                </Box>
                <Box position="relative" zIndex={10}>
                  <Text
                    color="#64748B"
                    lineHeight="relaxed"
                    mb={8}
                    minH="120px"
                  >
                    {t.text}
                  </Text>
                  <Flex align="center" gap={4} pt={6}>
                    <Flex
                      w={12}
                      h={12}
                      rounded="full"
                      bg={t.avatarBg}
                      align="center"
                      justify="center"
                      color={t.avatarColor}
                      fontWeight="bold"
                      fontFamily="heading"
                    >
                      {t.avatarLetter}
                    </Flex>
                    <Box>
                      <Text as="h6" fontWeight="bold" color="primaryNavy">
                        {t.name}
                      </Text>
                      <Text fontSize="xs" color="#64748B">
                        {t.role}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ),
          )}
        </Grid>
      </Box>
    </Box>
  );
}
