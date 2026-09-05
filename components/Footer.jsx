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
import Link from "next/link";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/#about", label: "О нас" },
  { href: "/#programs", label: "Программы" },
  { href: "/#testimonials", label: "Отзывы" },
  { href: "/news", label: "Новости" },
  { href: "/apply", label: "Подать заявку" },
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
                href="https://www.instagram.com/nou_novoye_pokoleniye/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                w={10}
                h={10}
                rounded="full"
                bg="rgba(255,255,255,0.1)"
                minW="auto"
                transition="all 0.2s"
                _hover={{ bg: "#FFB800", color: "#002045", transform: "translateY(-2px)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </IconButton>
              <IconButton
                as="a"
                href="https://youtube.com/channel/UCEjTS5_xiCZtYDOvW0RETFg?si=2hab2OcMbtHCWs8f"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                w={10}
                h={10}
                rounded="full"
                bg="rgba(255,255,255,0.1)"
                minW="auto"
                transition="all 0.2s"
                _hover={{ bg: "#FFB800", color: "#002045", transform: "translateY(-2px)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
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
                  as={Link}
                  key={item.href}
                  href={item.href}
                  color="rgba(219,234,254,0.8)"
                  _hover={{ color: "#FFB800", textDecoration: "none" }}
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
                  <Text
                    display="block"
                    color="rgba(219,234,254,0.9)"
                    fontSize="sm"
                    fontWeight="medium"
                    userSelect="all"
                  >
                    +998 (90) 230-29-63
                  </Text>
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
                    color="#FFB800"
                  >
                    mail
                  </Box>
                </Flex>
                <Text
                  color="rgba(219,234,254,0.9)"
                  fontSize="sm"
                  userSelect="all"
                >
                  new_generation_school@mail.ru
                </Text>
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
