"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/#about", label: "О нас" },
  { href: "/programs", label: "Программы" },
  { href: "/teachers", label: "Преподаватели" },
  { href: "/universities", label: "Университеты" },
  { href: "/gallery", label: "Кампус" },
  { href: "/news", label: "Новости" },
  { href: "/#location", label: "Контакты" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const onToggle = () => setIsOpen((prev) => !prev);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top={0}
        w="full"
        zIndex={50}
        py={4}
        px={{ base: 4, md: 12 }}
      >
        <Flex
          className="glass-panel"
          rounded="full"
          maxW="7xl"
          mx="auto"
          px={{ base: 4, md: 6 }}
          py={3}
          align="center"
          justify="space-between"
          boxShadow="glass"
        >
          {/* Brand */}
          <ChakraLink
            as={Link}
            href="/"
            display="flex"
            alignItems="center"
            gap={3}
            flexShrink={0}
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
            <Box
              display={{ base: "none", sm: "flex" }}
              lineHeight={"1.2"}
              flexDirection="column"
            >
              <Text
                fontFamily="heading"
                fontWeight="bold"
                color="#002045"
                lineHeight="tight"
                letterSpacing="tight"
                whiteSpace="nowrap"
              >
                New Generation
              </Text>
              <Text
                fontSize="10px"
                textTransform="uppercase"
                letterSpacing="widest"
                color="#64748B"
                fontWeight="medium"
                whiteSpace="nowrap"
              >
                School
              </Text>
            </Box>
          </ChakraLink>

          {/* Nav Links (Desktop) */}
          <HStack
            display={{ base: "none", xl: "flex" }}
            gap={1}
            bg="rgba(255,255,255,0.6)"
            rounded="full"
            p={1}
            border="1px solid rgba(255,255,255,0.7)"
            flexShrink={0}
          >
            {navLinks.map((link) => {
              const isActive = link.href === pathname || (link.href.startsWith("/#") && pathname === "/" && false);
              return (
                <ChakraLink
                  as={Link}
                  key={link.href}
                  href={link.href}
                  whiteSpace="nowrap"
                  fontWeight="medium"
                  fontSize={{ xl: "xs", "2xl": "sm" }}
                  px={{ xl: 3, "2xl": 4 }}
                  py={1.5}
                  rounded="full"
                  color="#002045"
                  bg={isActive ? "white" : "transparent"}
                  boxShadow={isActive ? "sm" : "none"}
                  transition="all 0.2s"
                  _hover={{
                    bg: "rgba(255,255,255,0.9)",
                    color: "#002045",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </ChakraLink>
              );
            })}
          </HStack>

          {/* Trailing Action */}
          <HStack gap={3} flexShrink={0}>
            <HStack display={{ base: "none", "2xl": "flex" }} gap={2} mr={2} flexShrink={0}>
              <Box
                as="span"
                className="material-symbols-outlined"
                color="#002045"
                fontSize="xl"
              >
                call
              </Box>
              <Box>
                <Text
                  as="a"
                  href="tel:+998913259565"
                  fontWeight="bold"
                  fontSize="xs"
                  color="#002045"
                  display="block"
                  lineHeight="1.2"
                  _hover={{ color: "blue.600" }}
                >
                  +998 (91) 325-95-65
                </Text>
                <Text
                  as="a"
                  href="tel:+998930417140"
                  fontSize="11px"
                  fontWeight="medium"
                  color="#64748B"
                  display="block"
                  lineHeight="1.2"
                  _hover={{ color: "blue.600" }}
                >
                  +998 (93) 041-71-40
                </Text>
              </Box>
            </HStack>
            <ChakraLink
              as={Link}
              href="/apply"
              display={{ base: "none", sm: "inline-flex" }}
              alignItems="center"
              justifyContent="center"
              whiteSpace="nowrap"
              flexShrink={0}
              px={{ base: 4, xl: 6 }}
              py={2.5}
              bg="#FFB800"
              color="#002045"
              fontWeight="bold"
              fontSize="sm"
              rounded="full"
              transition="all 0.2s"
              boxShadow="premium"
              _hover={{ bg: "accentGoldHover", textDecoration: "none", transform: "translateY(-1px)" }}
            >
              Подать заявку
            </ChakraLink>
            <Flex
              as="button"
              type="button"
              onClick={onToggle}
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              display={{ base: "flex", xl: "none" }}
              align="center"
              justify="center"
              flexShrink={0}
              w={10}
              h={10}
              color="#002045"
              bg="rgba(255,255,255,0.85)"
              rounded="full"
              border="1px solid rgba(255,255,255,0.6)"
              cursor="pointer"
              transition="all 0.2s"
              _active={{ transform: "scale(0.94)" }}
              _hover={{ bg: "white" }}
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                fontSize="24px"
                lineHeight="1"
              >
                {isOpen ? "close" : "menu"}
              </Box>
            </Flex>
          </HStack>
        </Flex>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <Box
            display={{ base: "block", xl: "none" }}
            bg="rgba(255, 255, 255, 0.98)"
            backdropFilter="blur(16px)"
            mt={2}
            rounded="3xl"
            p={5}
            boxShadow="0 20px 40px -15px rgba(0, 32, 69, 0.25)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.8)"
            maxH="calc(100vh - 100px)"
            overflowY="auto"
          >
            <VStack spacing={2} align="stretch">
              {navLinks.map((link) => {
                const isActive = link.href === pathname;
                return (
                  <ChakraLink
                    as={Link}
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    color={isActive ? "#002045" : "#1E293B"}
                    bg={isActive ? "rgba(0, 32, 69, 0.06)" : "transparent"}
                    fontWeight={isActive ? "bold" : "medium"}
                    fontSize="md"
                    px={4}
                    py={3}
                    rounded="xl"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    transition="all 0.15s ease"
                    _hover={{ bg: "rgba(0, 32, 69, 0.05)", textDecoration: "none" }}
                  >
                    <Text>{link.label}</Text>
                    {isActive && (
                      <Box w={2} h={2} rounded="full" bg="#FFB800" />
                    )}
                  </ChakraLink>
                );
              })}

              <Box pt={4} mt={2} borderTop="1px solid" borderColor="gray.100">
                <Box mb={4} px={4} py={3} bg="gray.50" rounded="xl">
                  <Flex alignItems="center" gap={3} mb={2}>
                    <Box as="span" className="material-symbols-outlined" fontSize="18px" color="#FFB800">
                      call
                    </Box>
                    <Box>
                      <Text fontSize="11px" color="gray.500" fontWeight="medium">Основной номер:</Text>
                      <Text
                        as="a"
                        href="tel:+998913259565"
                        fontSize="sm"
                        fontWeight="bold"
                        color="#002045"
                        display="block"
                      >
                        +998 (91) 325-95-65
                      </Text>
                    </Box>
                  </Flex>
                  <Flex alignItems="center" gap={3}>
                    <Box as="span" className="material-symbols-outlined" fontSize="18px" color="blue.500">
                      phone_forwarded
                    </Box>
                    <Box>
                      <Text fontSize="11px" color="gray.500" fontWeight="medium">Запасной номер:</Text>
                      <Text
                        as="a"
                        href="tel:+998930417140"
                        fontSize="sm"
                        fontWeight="bold"
                        color="#002045"
                        display="block"
                      >
                        +998 (93) 041-71-40
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <ChakraLink
                  as={Link}
                  href="/apply"
                  onClick={onClose}
                  display="block"
                  textAlign="center"
                  px={6}
                  py={3.5}
                  bg="#FFB800"
                  color="#002045"
                  fontWeight="bold"
                  fontSize="md"
                  rounded="full"
                  boxShadow="0 4px 14px rgba(255, 184, 0, 0.4)"
                  transition="all 0.2s"
                  _hover={{ textDecoration: "none", bg: "#e6a600", transform: "translateY(-1px)" }}
                  _active={{ transform: "scale(0.98)" }}
                >
                  Подать заявку
                </ChakraLink>
              </Box>
            </VStack>
          </Box>
        )}
      </Box>
    </>
  );
}
