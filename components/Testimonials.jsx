"use client";

import { Box, Grid, Heading, Text, Flex } from "@chakra-ui/react";

export default function Testimonials({
  subtitle = "Отзывы",
  titleHtml = "Слова родителей <br />\n<span style=\"font-size: 1.875rem; font-weight: 500; color: #64748B;\">ключ к счастливым детям.</span>",
  items = [
    {
      name: "Марина К.",
      role: "Мама ученика 5 класса",
      text: "Мы искали школу, где ребенок будет не только получать знания, но и с радостью идти на уроки. NGS превзошла все ожидания!",
      variant: "light",
      avatarLetter: "М",
      avatarBg: "blue.50",
      avatarColor: "blue.600"
    },
    {
      name: "Рустам А.",
      role: "Папа выпускницы",
      text: "Благодаря сильной подготовке дочь поступила в топовый вуз на грант. Огромное спасибо всему преподавательскому составу.",
      variant: "dark",
      avatarLetter: "Р",
      avatarBg: "#fdbb31",
      avatarColor: "black"
    },
    {
      name: "Дильдора У.",
      role: "Мама ученицы 2 класса",
      text: "Очень нравится современный подход и то, как преподаватели общаются с детьми. Ребенок стал более открытым и самостоятельным.",
      variant: "light",
      avatarLetter: "Д",
      avatarBg: "green.50",
      avatarColor: "green.600"
    }
  ]
}) {
  return (
    <Box
      as="section"
      id="testimonials"
      py={20}
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
              {subtitle}
            </Text>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              color="#002045"
              lineHeight={"1.1"}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          </Box>
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {items.map((t, idx) =>
            t.variant === "dark" ? (
              <Box
                key={idx}
                bg="#002045"
                color="white"
                rounded="2xl"
                p={8}
                boxShadow="xl"
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
                      color={t.avatarColor || "black"}
                      bg={t.avatarBg || "#fdbb31"}
                      fontWeight="bold"
                    >
                      {t.avatarLetter || t.name.charAt(0)}
                    </Flex>
                    <Box>
                      <Text as="h6" fontWeight="bold" color="white" fontSize="sm">
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
                key={idx}
                bg="white"
                rounded="2xl"
                border="1px solid"
                borderColor="gray.100"
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
                      bg={t.avatarBg || "blue.50"}
                      align="center"
                      justify="center"
                      color={t.avatarColor || "blue.600"}
                      fontWeight="bold"
                    >
                      {t.avatarLetter || t.name.charAt(0)}
                    </Flex>
                    <Box>
                      <Text as="h6" fontWeight="bold" color="#002045" fontSize="sm">
                        {t.name}
                      </Text>
                      <Text fontSize="xs" color="#64748B">
                        {t.role}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
