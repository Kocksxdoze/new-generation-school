"use client";

import {
  Box,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#about", label: "О нас" },
  { href: "/#features", label: "Почему мы" },
  { href: "/#programs", label: "Программы" },
  { href: "/#testimonials", label: "Отзывы" },
  { href: "/news", label: "Новости" },
  { href: "/#location", label: "Контакты" },
];

export default function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const pathname = usePathname();

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
            {navLinks.map((link) => {
              const isActive = link.href === pathname || (link.href.startsWith("/#") && pathname === "/" && false);
              return (
                <ChakraLink
                  as={Link}
                  key={link.href}
                  href={link.href}
                  fontWeight="medium"
                  fontSize="sm"
                  px={5}
                  py={2}
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
          <HStack gap={4}>
            <HStack display={{ base: "none", lg: "flex" }} gap={2} mr={2}>
              <Box
                as="span"
                className="material-symbols-outlined"
                color="#002045"
                fontSize="xl"
              >
                call
              </Box>
              <Text
                fontWeight="semibold"
                fontSize="sm"
                color="#002045"
                userSelect="all"
              >
                +998 (90) 230-29-63
              </Text>
            </HStack>
            <ChakraLink
              as={Link}
              href="/apply"
              display={{ base: "none", md: "inline-flex" }}
              alignItems="center"
              justifyContent="center"
              px={6}
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
              onClick={onToggle}
              aria-label="Открыть меню"
              display={{ base: "flex", md: "none" }}
              align="center"
              justify="center"
              w={10}
              h={10}
              color="#002045"
              bg="rgba(255,255,255,0.8)"
              rounded="full"
              border="1px solid rgba(255,255,255,0.5)"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: "white" }}
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                fontSize="md"
              >
                {isOpen ? "close" : "menu"}
              </Box>
            </Flex>
          </HStack>
        </Flex>

        {/* Mobile Menu */}
        {isOpen && (
          <Box
            display={{ base: "block", md: "none" }}
            bg="rgba(255, 255, 255, 0.95)"
            backdropFilter="blur(10px)"
            mt={2}
            rounded="2xl"
            p={4}
            boxShadow="lg"
            border="1px solid"
            borderColor="white"
          >
            <VStack spacing={4} align="stretch">
              {navLinks.map((link) => (
                <ChakraLink
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  color="#002045"
                  fontWeight="medium"
                  fontSize="md"
                  p={2}
                  rounded="md"
                  _hover={{ bg: "gray.50" }}
                >
                  {link.label}
                </ChakraLink>
              ))}
              <Box pt={4} borderTop="1px solid" borderColor="gray.100">
                <Flex
                  alignItems="center"
                  gap={2}
                  color="#002045"
                  fontWeight="bold"
                  mb={4}
                  userSelect="all"
                >
                  <Box as="span" className="material-symbols-outlined" fontSize="sm">
                    call
                  </Box>
                  <Text>+998 (90) 230-29-63</Text>
                </Flex>
                <ChakraLink
                  as={Link}
                  href="/apply"
                  onClick={onClose}
                  display="block"
                  textAlign="center"
                  px={6}
                  py={3}
                  bg="#FFB800"
                  color="#002045"
                  fontWeight="bold"
                  rounded="full"
                  _hover={{ textDecoration: "none", bg: "#e6a600" }}
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
