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
  imageUrl = "/uploads/back.mp4",
  stats = [
    { value: "15+", label: "лет успешной работы", icon: "workspace_premium" },
    { value: "40+", label: "квалифицированных преподавателей", icon: "school" },
    { value: "98%", label: "поступлений в вузы", icon: "account_balance" },
    { value: "1200+", label: "выпускников", icon: "groups" },
  ],
}) {
  const isVideo = imageUrl?.endsWith(".mp4") || imageUrl?.endsWith(".webm");

  const finalImageUrl = imageUrl
    ? isVideo
      ? imageUrl
      : imageUrl.startsWith("/")
        ? (process.env.NEXT_PUBLIC_API_URL
            ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
            : "https://new-generation-school.onrender.com") + imageUrl
        : imageUrl
    : "/bg.png";

  return (
    <Box
      as="section"
      position="relative"
      minH="100vh"
      w="100%"
      overflow="hidden"
      display="flex"
      alignItems="center"
      pt={{ base: "120px", md: "100px" }}
      pb={{ base: 12, md: 16 }}
    >
      {/* Background Media */}
      <Box position="absolute" inset={0} zIndex={0} bg="gray.900">
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
            bgPosition="center"
          />
        )}
        {/* Dark Overlay so text is readable */}
        <Box position="absolute" inset={0} bg="blackAlpha.600" />
      </Box>

      {/* Main Content Container */}
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={10}
        w="full"
      >
        <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={8}>
          <GridItem colSpan={{ base: 1, lg: 8 }}>
            <VStack align="start" spacing={5} maxW="2xl">
              <Heading
                as="h1"
                fontSize={{ base: "32px", sm: "44px", md: "5xl", lg: "68px" }}
                fontWeight="800"
                color="white"
                lineHeight="1.1"
                letterSpacing="tight"
                dangerouslySetInnerHTML={{ __html: titleHtml }}
              />

              {/* School Brand Accent Tag */}
              <Flex
                align="center"
                gap={2}
                px={4}
                py={1.5}
                bg="rgba(255, 255, 255, 0.12)"
                backdropFilter="blur(10px)"
                rounded="full"
                border="1px solid rgba(255, 255, 255, 0.25)"
                w="fit-content"
              >
                <Box as="span" className="material-symbols-outlined" color="#ffb800" fontSize="16px">
                  location_on
                </Box>
                <Text
                  fontSize={{ base: "xs", sm: "sm" }}
                  fontWeight="bold"
                  color="#ffb800"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {badgeText}
                </Text>
              </Flex>

              <Text
                fontSize={{ base: "md", sm: "lg", md: "2xl" }}
                color="gray.200"
                lineHeight="1.6"
                maxW="xl"
              >
                {description}
              </Text>

              <HStack
                spacing={4}
                pt={6}
                w="full"
                flexDir={{ base: "column", sm: "row" }}
                align="flex-start"
              >
                <ChakraLink
                  as={Link}
                  href={applyUrl && applyUrl !== "#" ? applyUrl : "/apply"}
                  px={10}
                  py={5}
                  bg="#ffb800"
                  color="#002045"
                  fontWeight="bold"
                  rounded="full"
                  transition="all 0.3s"
                  _hover={{
                    bg: "#e6a600",
                    transform: "translateY(-2px)",
                    textDecoration: "none",
                  }}
                  w={{ base: "full", sm: "auto" }}
                  textAlign="center"
                  fontSize="lg"
                >
                  Поступить в школу →
                </ChakraLink>
                <Box
                  as="button"
                  type="button"
                  px={10}
                  py={5}
                  bg="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(10px)"
                  color="white"
                  fontWeight="bold"
                  rounded="full"
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.3)"
                  transition="all 0.3s"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.2)",
                  }}
                  w={{ base: "full", sm: "auto" }}
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="lg"
                  cursor="pointer"
                >
                  <Box as="span" className="material-symbols-outlined" mr={2}>
                    play_circle
                  </Box>
                  Смотреть видео
                </Box>
              </HStack>
            </VStack>
          </GridItem>
        </Grid>

        {/* Stats Row */}
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap={{ base: 4, sm: 6, md: 8 }}
          mt={{ base: 10, md: 16 }}
          pt={{ base: 6, md: 10 }}
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.2)"
        >
          {stats.map((stat, idx) => (
            <GridItem key={idx}>
              <Flex align="center" gap={4}>
                <Flex
                  w={12}
                  h={12}
                  rounded="full"
                  bg="rgba(255, 255, 255, 0.1)"
                  backdropFilter="blur(10px)"
                  align="center"
                  justify="center"
                  color="#ffb800"
                  flexShrink={0}
                  border="1px solid"
                  borderColor="rgba(255, 255, 255, 0.2)"
                >
                  <Box as="span" className="material-symbols-outlined">
                    {stat.icon}
                  </Box>
                </Flex>
                <Box>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="white"
                    lineHeight="1.2"
                  >
                    {stat.value}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.300"
                    textTransform="uppercase"
                    letterSpacing="wide"
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
  );
}
