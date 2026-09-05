"use client";

import { Box, Heading, Text, Flex } from "@chakra-ui/react";

export default function LocationMap() {
  return (
    <Box
      as="section"
      id="location"
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
          Контакты
        </Text>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="bold"
          color="#002045"
        >
          Наше местоположение
        </Heading>
        <Text color="#64748B" mt={4} maxW="2xl" mx="auto" fontSize="lg">
          Приходите к нам в гости и познакомьтесь со школой лично
        </Text>
      </Box>

      <Box
        className="apple-card"
        overflow="hidden"
        h="500px"
        position="relative"
        role="group"
      >
        <Box
          as="iframe"
          src="https://yandex.uz/map-widget/v1/?ll=71.773084%2C40.370058&z=17&pt=71.773084,40.370058,pm2rdm"
          w="100%"
          h="100%"
          border={0}
          frameBorder="0"
          allowFullScreen={false}
          loading="lazy"
          title="Расположение New Generation School"
        />
        <Box
          display={{ base: "none", md: "block" }}
          position="absolute"
          bottom={8}
          left={8}
          w={96}
          className="glass-panel"
          p={6}
          rounded="3xl"
          boxShadow="premium"
          border="1px solid rgba(255,255,255,0.5)"
          pointerEvents="none"
        >
          <Flex align="flex-start" gap={4}>
            <Flex
              w={12}
              h={12}
              rounded="2xl"
              bg="#002045"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                color="#fdbb31"
              >
                location_on
              </Box>
            </Flex>
            <Box>
              <Text fontWeight="bold" color="#002045" mb={1}>
                New Generation School
              </Text>
              <Text fontSize="sm" color="#64748B">
                г. Фергана, ул. Мустакиллик, 228
              </Text>
              <Flex
                mt={4}
                align="center"
                gap={2}
                fontSize="xs"
                fontWeight="bold"
                color="#002045"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                <Box
                  w={2}
                  h={2}
                  rounded="full"
                  bg="green.500"
                  className="pulse-dot"
                />
                Открыто сейчас
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Mobile-only Address Info Card below map */}
      <Box
        display={{ base: "block", md: "none" }}
        mt={4}
        p={5}
        bg="white"
        rounded="2xl"
        border="1px solid"
        borderColor="gray.100"
        boxShadow="sm"
      >
        <Flex align="center" gap={3}>
          <Flex
            w={10}
            h={10}
            rounded="xl"
            bg="#002045"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Box
              as="span"
              className="material-symbols-outlined"
              color="#fdbb31"
              fontSize="sm"
            >
              location_on
            </Box>
          </Flex>
          <Box>
            <Text fontWeight="bold" fontSize="sm" color="#002045">
              New Generation School · Фергана
            </Text>
            <Text fontSize="xs" color="#64748B">
              ул. Мустакиллик, 228
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
