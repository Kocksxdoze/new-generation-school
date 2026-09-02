"use client";

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  VStack,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/#about", label: "О нас" },
  { href: "/#values", label: "Ценности" },
  { href: "/#testimonials", label: "Отзывы" },
  { href: "/#news", label: "Новости" },
];

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="#002045"
      color="white"
      mt={12}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        w={96}
        h={96}
        bg="rgba(59,130,246,0.1)"
        rounded="full"
        filter="blur(64px)"
        transform="translate(50%, -50%)"
      />
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 6, md: 12 }}
        py={20}
        position="relative"
        zIndex={10}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(12, 1fr)",
          }}
          gap={{ base: 12, lg: 8 }}
          mb={16}
        >
          <GridItem
            colSpan={{ base: 1, lg: 4 }}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Flex
              align="center"
              gap={3}
              mb={6}
              bg="rgba(255,255,255,0.05)"
              p={3}
              rounded="2xl"
              backdropFilter="blur(4px)"
              border="1px solid rgba(255,255,255,0.1)"
            >
              <Box
                as="img"
                alt="Logo"
                src="/ЛОГО.png"
                h={12}
                w="auto"
                filter="brightness(0) invert(1)"
              />
              <Box>
                <Text
                  fontFamily="heading"
                  fontWeight="bold"
                  fontSize="xl"
                  lineHeight="tight"
                >
                  New Generation
                </Text>
                <Text
                  fontSize="10px"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color="blue.200"
                >
                  School
                </Text>
              </Box>
            </Flex>
            <Text
              color="rgba(219,234,254,0.8)"
              lineHeight="relaxed"
              mb={8}
              maxW="sm"
            >
              Где каждый успешен! Мы создаем среду для раскрытия талантов и
              развития навыков будущего.
            </Text>
            <Flex gap={3}>
              <IconButton
                as="a"
                href="#"
                aria-label="Instagram"
                w={10}
                h={10}
                rounded="full"
                bg="rgba(255,255,255,0.1)"
                minW="auto"
                _hover={{ bg: "accentGold", color: "primaryNavy" }}
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="sm"
                >
                  photo_camera
                </Box>
              </IconButton>
              <IconButton
                as="a"
                href="#"
                aria-label="Видео"
                w={10}
                h={10}
                rounded="full"
                bg="rgba(255,255,255,0.1)"
                minW="auto"
                _hover={{ bg: "accentGold", color: "primaryNavy" }}
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  fontSize="sm"
                >
                  play_arrow
                </Box>
              </IconButton>
            </Flex>
          </GridItem>

          <GridItem colSpan={{ base: 1, lg: 2 }} colStart={{ lg: 6 }}>
            <Heading
              as="h4"
              fontSize="lg"
              fontWeight="bold"
              mb={6}
              color="white"
            >
              Навигация
            </Heading>
            <VStack align="start" gap={4}>
              {navItems.map((item) => (
                <ChakraLink
                  key={item.href}
                  href={item.href}
                  color="rgba(219,234,254,0.8)"
                  _hover={{ color: "#fdbb31", textDecoration: "none" }}
                >
                  {item.label}
                </ChakraLink>
              ))}
            </VStack>
          </GridItem>

          <GridItem
            colSpan={{ base: 1, lg: 4 }}
            colStart={{ lg: 9 }}
            bg="rgba(255,255,255,0.05)"
            p={8}
            rounded="2rem"
            border="1px solid rgba(255,255,255,0.1)"
            backdropFilter="blur(4px)"
          >
            <Heading
              as="h4"
              fontSize="lg"
              fontWeight="bold"
              mb={6}
              color="white"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Box w={2} h={2} rounded="full" bg="#fdbb31" />
              Контакты
            </Heading>
            <VStack align="stretch" gap={6}>
              <Flex align="flex-start" gap={4}>
                <Flex
                  w={10}
                  h={10}
                  rounded="full"
                  bg="rgba(255,255,255,0.1)"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Box
                    as="span"
                    className="material-symbols-outlined"
                    fontSize="sm"
                    color="#fdbb31"
                  >
                    location_on
                  </Box>
                </Flex>
                <ChakraLink
                  href="#"
                  color="rgba(219,234,254,0.8)"
                  fontSize="sm"
                  _hover={{ color: "white", textDecoration: "none" }}
                >
                  г. Фергана, улица Мустакиллик, дом 228
                </ChakraLink>
              </Flex>
              <Flex align="flex-start" gap={4}>
                <Flex
                  w={10}
                  h={10}
                  rounded="full"
                  bg="rgba(255,255,255,0.1)"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Box
                    as="span"
                    className="material-symbols-outlined"
                    fontSize="sm"
                    color="#fdbb31"
                  >
                    call
                  </Box>
                </Flex>
                <Box>
                  <ChakraLink
                    href="tel:+998902302963"
                    display="block"
                    color="rgba(219,234,254,0.8)"
                    fontSize="sm"
                    _hover={{ color: "white", textDecoration: "none" }}
                  >
                    +998 (90) 230-29-63
                  </ChakraLink>
                  <Text fontSize="xs" color="rgba(191,219,254,0.5)" mt={1}>
                    Пн-Пт: 08:00-17:00, Сб: 08:00-14:00
                  </Text>
                </Box>
              </Flex>
              <Flex align="flex-start" gap={4}>
                <Flex
                  w={10}
                  h={10}
                  rounded="full"
                  bg="rgba(255,255,255,0.1)"
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  <Box
                    as="span"
                    className="material-symbols-outlined"
                    fontSize="sm"
                    color="#fdbb31"
                  >
                    mail
                  </Box>
                </Flex>
                <ChakraLink
                  href="mailto:new_generation_school@mail.ru"
                  color="rgba(219,234,254,0.8)"
                  fontSize="sm"
                  _hover={{ color: "white", textDecoration: "none" }}
                >
                  new_generation_school@mail.ru
                </ChakraLink>
              </Flex>
            </VStack>
          </GridItem>
        </Grid>

        <Flex
          borderTop="1px solid rgba(255,255,255,0.1)"
          pt={8}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="rgba(219,234,254,0.5)">
            © 2026 New Generation School. Все права защищены. Created by Eciva.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
