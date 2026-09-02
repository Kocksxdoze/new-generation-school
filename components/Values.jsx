"use client";

import { Box, Grid, Heading, Text, Flex } from "@chakra-ui/react";
import { values } from "../data/values";

export default function Values() {
  return (
    <Box
      as="section"
      id="values"
      py={10}
      px={{ base: 6, md: 12 }}
      maxW="7xl"
      mx="auto"
    >
      <Box textAlign="center" mb={16}>
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
          Наши ценности
        </Text>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="bold"
          color="primaryNavy"
          maxW="3xl"
          mx="auto"
          lineHeight="1.1"
        >
          Создаем среду, где хочется <br />
          <Box as="span" color="#64748B">
            учиться и развиваться
          </Box>
        </Heading>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
        {values.map((v) => (
          <Flex
            key={v.title}
            className="apple-card"
            p={8}
            direction="column"
            h="full"
            align="center"
            textAlign="center"
          >
            <Flex
              w={16}
              h={16}
              rounded="2xl"
              bg={v.iconBg}
              color={v.iconColor}
              align="center"
              justify="center"
              mb={6}
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                fontSize="3xl"
              >
                {v.icon}
              </Box>
            </Flex>
            <Heading
              as="h3"
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="bold"
              color="#002045"
              mb={3}
            >
              {v.title}
            </Heading>
            <Text color="#64748B" flexGrow={1}>
              {v.text}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
}
