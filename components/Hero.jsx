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

export default function Hero() {
  return (
    <Box
      as="section"
      position="relative"
      pt={32}
      pb={24}
      px={{ base: 6, md: 12 }}
      maxW="7xl"
      mx="auto"
      minH="95vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      {/* Ambient Gradients */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="800px"
        h="800px"
        bg="blue.50"
        rounded="full"
        filter="blur(120px)"
        opacity={0.7}
        zIndex={-10}
        transform="translate(33%, -25%)"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        w="600px"
        h="600px"
        bg="rgba(255, 184, 0, 0.05)"
        rounded="full"
        filter="blur(100px)"
        opacity={0.6}
        zIndex={-10}
        transform="translate(-25%, 25%)"
      />

      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
        gap={12}
        alignItems="center"
      >
        <GridItem colSpan={{ base: 1, lg: 5 }} zIndex={10}>
          <VStack align="start" gap={8}>
            <HStack
              gap={2}
              px={4}
              py={2}
              rounded="full"
              bg="(255,255,255,0.8)"
              border="1px solid rgba(255,255,255,0.5)"
              backdropFilter="blur(12px)"
              boxShadow="apple"
            >
              <Box
                w={2}
                h={2}
                rounded="full"
                bg="#ffb800"
                className="pulse-dot"
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="primaryNavy"
              >
                Где каждый успешен!
              </Text>
            </HStack>

            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight="extrabold"
              color="#002045"
              lineHeight="1.05"
              letterSpacing="tight"
            >
              Перспективное <br />
              <Box as="span" color={"#002045"} className="text-gradient">
                будущее <br />
              </Box>
              <Box as="span" className="text-gradient">
                детей
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="#64748B"
              lineHeight="relaxed"
              maxW="lg"
            >
              Раскрытие талантов и развитие навыков через разнообразные
              образовательные программы и инновационный подход.
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              align="center"
              gap={4}
              pt={4}
              w={{ base: "full", sm: "auto" }}
            >
              <ChakraLink
                href="#"
                w={{ base: "full", sm: "auto" }}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={8}
                py={4}
                bg="#002045"
                color="white"
                fontWeight="bold"
                rounded="full"
                boxShadow="premium"
                transition="all 0.2s"
                _hover={{ opacity: 0.9, textDecoration: "none" }}
              >
                Подать заявку
              </ChakraLink>
              <ChakraLink
                href="https://www.youtube.com/watch?v=VTZey0E9H5E"
                target="_blank"
                w={{ base: "full", sm: "auto" }}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                px={8}
                py={4}
                bg="white"
                color="primaryNavy"
                fontWeight="bold"
                rounded="full"
                boxShadow="apple"
                border="1px solid"
                borderColor="gray.100"
                role="group"
                transition="all 0.2s"
                _hover={{ bg: "gray.50", textDecoration: "none" }}
              >
                <Flex
                  w={8}
                  h={8}
                  rounded="full"
                  bg="rgba(255, 184, 0, 0.2)"
                  align="center"
                  justify="center"
                  transition="colors 0.2s"
                  _groupHover={{ bg: "rgba(255, 184, 0, 0.3)" }}
                >
                  <Box
                    as="span"
                    className="material-symbols-outlined"
                    color="#ffb800"
                    fontSize="md !important"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </Box>
                </Flex>
                Видео о нас
              </ChakraLink>
            </Flex>
          </VStack>
        </GridItem>

        <GridItem
          colSpan={{ base: 1, lg: 7 }}
          position="relative"
          h={{ base: "60vh", lg: "75vh" }}
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-tr, blue.50, white)"
            rounded="3rem"
            boxShadow="apple"
            border="1px solid white"
            zIndex={0}
          />
          <Flex
            position="relative"
            zIndex={10}
            w="full"
            h="full"
            align="flex-end"
            justify="center"
            pt={12}
          >
            <Box
              as="img"
              src="/bg.png"
              alt="Ученица New Generation School"
              w="auto"
              h="90%"
              objectFit="contain"
              objectPosition="bottom"
              filter="drop-shadow(0 25px 25px rgba(0,0,0,0.15))"
            />
          </Flex>

          {/* Floating Stat Card */}
          <Box
            className="glass-panel float-card"
            position="absolute"
            top={12}
            left="-6"
            zIndex={20}
            p={5}
            rounded="3xl"
            boxShadow="apple"
          >
            <HStack gap={4}>
              <Flex
                w={12}
                h={12}
                rounded="full"
                bg="blue.100"
                align="center"
                justify="center"
              >
                <Box
                  as="span"
                  className="material-symbols-outlined"
                  color="blue.600"
                >
                  lightbulb
                </Box>
              </Flex>
              <Box>
                <Text fontSize="sm" color="#64748B" fontWeight="medium">
                  Подход
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="#002045">
                  Инновационный
                </Text>
              </Box>
            </HStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
