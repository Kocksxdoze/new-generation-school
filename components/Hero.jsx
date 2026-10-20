"use client";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Link as ChakraLink,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Hero({
  badgeText = 'НОУ "Новое Поколение" · ФЕРГАНА',
  titleHtml = "Образование, которое <br />открывает больше <br />возможностей",
  description = "Современная школа полного цикла с сильным преподавательским составом, современной образовательной средой и индивидуальным подходом к развитию каждого ученика.",
  applyUrl = "#",
  videoUrl = "https://www.youtube.com/watch?v=VTZey0E9H5E",
  imageUrl = "/hero-panda.png",
  stats = [
    { value: "15+", label: "лет успешной работы", icon: "workspace_premium" },
    { value: "40+", label: "квалифицированных преподавателей", icon: "school" },
    { value: "98%", label: "поступлений в вузы", icon: "account_balance" },
    { value: "1200+", label: "выпускников", icon: "groups" },
  ],
}) {
  const isVideo = imageUrl?.endsWith(".mp4") || imageUrl?.endsWith(".webm");

  let finalImageUrl = "/hero-panda.png";

  if (imageUrl) {
    if (isVideo) {
      finalImageUrl = imageUrl;
    } else if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      finalImageUrl = imageUrl;
    } else if (
      imageUrl.startsWith("/hero-") || 
      imageUrl.startsWith("/bg.") || 
      imageUrl.startsWith("/images/") ||
      imageUrl === "/uploads/hero-panda.png"
    ) {
      finalImageUrl = imageUrl;
    } else if (imageUrl.startsWith("/")) {
      const backendBase = process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
        : "https://new-generation-school.onrender.com";
      finalImageUrl = `${backendBase}${imageUrl}`;
    } else {
      finalImageUrl = imageUrl;
    }
  }

  return (
    <Box
      as="section"
      position="relative"
      minH="100vh"
      w="100%"
      overflow="hidden"
      display="flex"
      alignItems="center"
      pt={{ base: "120px", md: "130px", lg: "140px", "2xl": "150px" }}
      pb={{ base: 12, md: 16 }}
    >
      {/* Background Media */}
      <Box position="absolute" inset={0} zIndex={0} bg="#EEF2F6">
        {isVideo ? (
          <video
            src={finalImageUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            position="absolute"
            inset={0}
            bgImage={`url('${finalImageUrl}')`}
            bgSize="cover"
            bgPosition={{ base: "center", md: "center" }}
          />
        )}
        {/* Soft light gradient overlay: provides maximum contrast for dark text while preserving the bright vibrant mascot */}
        <Box
          position="absolute"
          inset={0}
          bgGradient={{
            base: "linear(to-b, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.88) 55%, rgba(255, 255, 255, 0.6) 80%, rgba(255, 255, 255, 0.25) 100%)",
            lg: "linear(to-r, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.9) 35%, rgba(255, 255, 255, 0.55) 60%, rgba(255, 255, 255, 0.15) 85%, transparent 100%)",
          }}
        />
      </Box>

      {/* Main Content Container */}
      <Box
        maxW={{ base: "7xl", "2xl": "1440px" }}
        mx="auto"
        px={{ base: 4, md: 8, "2xl": 8 }}
        position="relative"
        zIndex={10}
        w="full"
      >
        <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={8}>
          <GridItem colSpan={{ base: 1, lg: 8 }}>
            {/* White Frosted Glass Card framing the hero text */}
            <Box
              className="glass-panel"
              p={{ base: 6, sm: 8, md: 9 }}
              rounded="3xl"
              boxShadow="0 20px 45px -10px rgba(0, 32, 69, 0.12)"
              border="1px solid rgba(255, 255, 255, 0.95)"
              bg="rgba(255, 255, 255, 0.85)"
              backdropFilter="blur(24px)"
              WebkitBackdropFilter="blur(24px)"
              maxW="2xl"
            >
              <VStack align="start" spacing={5}>
                {/* School Brand Accent Tag */}
                <Flex
                  align="center"
                  gap={2}
                  px={4}
                  py={1.5}
                  bg="white"
                  boxShadow="sm"
                  rounded="full"
                  border="1px solid rgba(0, 32, 69, 0.12)"
                  w="fit-content"
                >
                  <Box as="span" className="material-symbols-outlined" color="#002045" fontSize="16px">
                    location_on
                  </Box>
                  <Text
                    fontSize={{ base: "xs", sm: "sm" }}
                    fontWeight="bold"
                    color="#002045"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {badgeText}
                  </Text>
                </Flex>

                <Heading
                  as="h1"
                  fontSize={{ base: "32px", sm: "44px", md: "5xl", lg: "62px" }}
                  fontWeight="800"
                  color="#002045"
                  lineHeight="1.1"
                  letterSpacing="tight"
                  dangerouslySetInnerHTML={{ __html: titleHtml }}
                />

                <Text
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  color="#334155"
                  lineHeight="1.6"
                  fontWeight="500"
                >
                  {description}
                </Text>

                <HStack
                  spacing={4}
                  pt={4}
                  w="full"
                  flexDir={{ base: "column", sm: "row" }}
                  align="flex-start"
                >
                  <ChakraLink
                    as={Link}
                    href={applyUrl && applyUrl !== "#" ? applyUrl : "/apply"}
                    px={8}
                    py={4}
                    bg="#ffb800"
                    color="#002045"
                    fontWeight="bold"
                    rounded="full"
                    transition="all 0.3s"
                    boxShadow="0 4px 14px rgba(255, 184, 0, 0.35)"
                    _hover={{
                      bg: "#e6a600",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(255, 184, 0, 0.45)",
                      textDecoration: "none",
                    }}
                    w={{ base: "full", sm: "auto" }}
                    textAlign="center"
                    fontSize="md"
                  >
                    Поступить в школу →
                  </ChakraLink>
                  <ChakraLink
                    as={Link}
                    href={videoUrl && videoUrl.startsWith("http") ? videoUrl : "/gallery"}
                    target={videoUrl && videoUrl.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    px={8}
                    py={4}
                    bg="white"
                    color="#002045"
                    fontWeight="bold"
                    rounded="full"
                    border="1px solid"
                    borderColor="rgba(0, 32, 69, 0.15)"
                    boxShadow="sm"
                    transition="all 0.3s"
                    _hover={{
                      bg: "gray.50",
                      transform: "translateY(-2px)",
                      boxShadow: "md",
                      borderColor: "rgba(0, 32, 69, 0.3)",
                      textDecoration: "none",
                    }}
                    w={{ base: "full", sm: "auto" }}
                    textAlign="center"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="md"
                    cursor="pointer"
                  >
                    <Box as="span" className="material-symbols-outlined" mr={2} color="#002045">
                      play_circle
                    </Box>
                    Смотреть видео
                  </ChakraLink>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
        </Grid>

        {/* Stats Row in Frosted Glass Capsule */}
        <Box
          mt={{ base: 8, md: 12 }}
          p={{ base: 4, sm: 6 }}
          rounded="2xl"
          bg="rgba(255, 255, 255, 0.88)"
          backdropFilter="blur(20px)"
          WebkitBackdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.95)"
          boxShadow="0 10px 30px -5px rgba(0, 32, 69, 0.08)"
        >
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
            gap={{ base: 4, sm: 6, md: 8 }}
          >
            {stats.map((stat, idx) => (
              <GridItem key={idx}>
                <Flex align="center" gap={4}>
                  <Flex
                    w={12}
                    h={12}
                    rounded="full"
                    bg="white"
                    boxShadow="sm"
                    align="center"
                    justify="center"
                    color="#002045"
                    flexShrink={0}
                    border="1px solid"
                    borderColor="rgba(0, 32, 69, 0.1)"
                  >
                    <Box as="span" className="material-symbols-outlined">
                      {stat.icon}
                    </Box>
                  </Flex>
                  <Box>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="#002045"
                      lineHeight="1.2"
                    >
                      {stat.value}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="#475569"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      fontWeight="semibold"
                    >
                      {stat.label}
                    </Text>
                  </Box>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
