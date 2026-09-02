"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";

const navLinks = [
  { href: "#about", label: "О нас" },
  { href: "#features", label: "Почему мы" },
  { href: "#values", label: "Ценности" },
  { href: "#testimonials", label: "Отзывы" },
  { href: "#news", label: "Новости" },
];

export default function Navbar() {
  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      w="full"
      zIndex={50}
      py={4}
      px={{ base: 6, md: 12 }}
    >
      <Flex
        className="glass-panel"
        rounded="full"
        maxW="7xl"
        mx="auto"
        px={6}
        py={3}
        align="center"
        justify="space-between"
        boxShadow="glass"
      >
        {/* Brand */}
        <ChakraLink
          href="#"
          display="flex"
          alignItems="center"
          gap={3}
          role="group"
          _hover={{ textDecoration: "none" }}
        >
          <Box
            as="img"
            src="/ЛОГО.png"
            alt="New Generation School Logo"
            h="10"
            w="auto"
            objectFit="contain"
            transition="transform 0.2s"
            _groupHover={{ transform: "scale(1.05)" }}
          />
          <Box display="flex" lineHeight={"1.2"} flexDirection="column">
            <Text
              fontFamily="heading"
              fontWeight="bold"
              color="#002045"
              lineHeight="tight"
              letterSpacing="tight"
            >
              New Generation
            </Text>
            <Text
              fontSize="10px"
              textTransform="uppercase"
              letterSpacing="widest"
              color="#64748B"
              fontWeight="medium"
            >
              School
            </Text>
          </Box>
        </ChakraLink>

        {/* Nav Links (Desktop) */}
        <HStack
          display={{ base: "none", md: "flex" }}
          gap={1}
          bg="rgba(255,255,255,0.5)"
          rounded="full"
          p={1}
          border="1px solid rgba(255,255,255,0.6)"
        >
          {navLinks.map((link, i) => (
            <ChakraLink
              key={link.href}
              href={link.href}
              fontWeight="medium"
              fontSize="sm"
              px={5}
              py={2}
              rounded="full"
              color={i === 0 ? "primaryNavy" : "#64748B"}
              bg={i === 0 ? "white" : "transparent"}
              boxShadow={i === 0 ? "sm" : "none"}
              transition="all 0.2s"
              _hover={{
                bg: i === 0 ? "white" : "rgba(255,255,255,0.8)",
                color: "primaryNavy",
                textDecoration: "none",
              }}
            >
              {link.label}
            </ChakraLink>
          ))}
        </HStack>

        {/* Trailing Action */}
        <HStack gap={4}>
          <HStack display={{ base: "none", lg: "flex" }} gap={2} mr={2}>
            <Box
              as="span"
              className="material-symbols-outlined"
              color="primaryNavy"
              fontSize="xl"
            >
              call
            </Box>
            <ChakraLink
              href="tel:+998902302963"
              fontWeight="medium"
              fontSize="sm"
              color="primaryNavy"
              _hover={{ color: "accentGold", textDecoration: "none" }}
            >
              +998 (90) 230-29-63
            </ChakraLink>
          </HStack>
          <ChakraLink
            href="#"
            display={{ base: "none", md: "inline-flex" }}
            alignItems="center"
            justifyContent="center"
            px={6}
            py={2.5}
            bg="#FFB800"
            color="primaryNavy"
            fontWeight="bold"
            fontSize="sm"
            rounded="full"
            transition="colors 0.2s"
            boxShadow="premium"
            _hover={{ bg: "accentGoldHover", textDecoration: "none" }}
          >
            Подать заявку
          </ChakraLink>
          <IconButton
            aria-label="Открыть меню"
            display={{ base: "flex", md: "none" }}
            p={2}
            color="primaryNavy"
            bg="rgba(255,255,255,0.8)"
            rounded="full"
            minW="auto"
            h="auto"
          >
            <Box as="span" className="material-symbols-outlined">
              menu
            </Box>
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  );
}
