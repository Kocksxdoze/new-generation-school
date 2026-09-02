"use client";

import { Box, Grid, GridItem, Heading, Text, Flex } from "@chakra-ui/react";

export default function Features() {
  return (
    <Box
      as="section"
      id="features"
      py={24}
      px={{ base: 6, md: 12 }}
      maxW="7xl"
      mx="auto"
    >
      <Box textAlign="center" mb={16}>
        <Text
          as="span"
          display="block"
          color="#ffb800"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
          fontSize="sm"
          mb={2}
        >
          Почему мы
        </Text>
        <Heading
          as="h2"
          fontFamily="heading"
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="bold"
          color="#002045"
        >
          Добро пожаловать в New Generation
        </Heading>
        <Text color="#64748B" mt={4} maxW="2xl" mx="auto" fontSize="lg">
          Школа, где обучение встречается с инновациями и комфортом
        </Text>
      </Box>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        sx={{ gridAutoRows: "280px" }}
      >
        {/* Block 1 */}
        <GridItem
          colSpan={{ base: 1, lg: 2 }}
          className="apple-card bento-card"
          p={10}
          position="relative"
          overflow="hidden"
          role="group"
        >
          <Box
            position="absolute"
            right={0}
            bottom={0}
            w={64}
            h={64}
            bg="blue.50"
            rounded="full"
            filter="blur(64px)"
            transition="colors 0.2s"
            _groupHover={{ bg: "blue.100" }}
            opacity={0.6}
          />
          <Flex
            position="relative"
            zIndex={10}
            h="full"
            direction="column"
            justify="space-between"
          >
            <Flex
              w={14}
              h={14}
              rounded="2xl"
              bg="#002045"
              align="center"
              justify="center"
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                color="#ffb800"
                fontSize="4xl"
              >
                workspace_premium
              </Box>
            </Flex>
            <Box>
              <Heading
                as="h3"
                fontFamily="heading"
                fontSize="3xl"
                fontWeight="bold"
                color="primaryNavy"
                mb={3}
              >
                Высокие результаты
              </Heading>
              <Text color="#64748B" fontSize="lg" maxW="md">
                Наши ученики достигают больших результатов благодаря
                современному подходу к образованию и индивидуальному вниманию.
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Block 2 */}
        <GridItem
          className="apple-card bento-card"
          p={10}
          position="relative"
          overflow="hidden"
          role="group"
        >
          <Box position="absolute" inset={0} className="bg-pattern" />
          <Flex
            position="relative"
            zIndex={10}
            h="full"
            direction="column"
            justify="space-between"
          >
            <Flex
              w={14}
              h={14}
              rounded="2xl"
              bg="blue.50"
              align="center"
              justify="center"
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                color="blue.500"
                fontSize="3xl"
              >
                menu_book
              </Box>
            </Flex>
            <Box>
              <Heading
                as="h3"
                fontFamily="heading"
                fontSize="2xl"
                fontWeight="bold"
                color="primaryNavy"
                mb={2}
              >
                Обучение
              </Heading>
              <Text color="#64748B">
                Современная методика, адаптированная под потребности.
              </Text>
            </Box>
          </Flex>
        </GridItem>

        {/* Block 3 */}
        <GridItem
          className="apple-card bento-card"
          p={10}
          h="full"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Flex
            w={14}
            h={14}
            rounded="2xl"
            bg="#FFFbeb"
            align="center"
            justify="center"
          >
            <Box
              as="span"
              className="material-symbols-outlined"
              color="#ffb800"
              fontSize="3xl"
            >
              architecture
            </Box>
          </Flex>
          <Box>
            <Heading
              as="h3"
              fontFamily="heading"
              fontSize="2xl"
              fontWeight="bold"
              color="primaryNavy"
              mb={2}
            >
              Среда
            </Heading>
            <Text color="#64748B">
              Светлые классы и безопасное пространство для развития.
            </Text>
          </Box>
        </GridItem>

        {/* Block 4 */}
        <GridItem
          colSpan={{ base: 1, lg: 2 }}
          className="bento-card"
          bg="#002045"
          color="white"
          rounded="2rem"
          p={10}
          position="relative"
          overflow="hidden"
          display="flex"
          alignItems="center"
          boxShadow="premium"
        >
          <Box position="relative" zIndex={10} flex={1}>
            <Flex
              w={14}
              h={14}
              rounded="2xl"
              bg="rgba(255,255,255,0.1)"
              align="center"
              justify="center"
              mb={6}
              backdropFilter="blur(8px)"
            >
              <Box
                as="span"
                className="material-symbols-outlined"
                color="white"
                fontSize="3xl"
              >
                extension
              </Box>
            </Flex>
            <Heading
              as="h3"
              fontFamily="heading"
              fontSize="3xl"
              fontWeight="bold"
              mb={3}
            >
              Всестороннее развитие
            </Heading>
            <Text color="rgba(219,234,254,0.8)" fontSize="lg" maxW="sm">
              Широкий выбор дополнительных программ для раскрытия полного
              потенциала вашего ребенка.
            </Text>
          </Box>
          {/* Decorative shapes */}
          <Box
            display={{ base: "none", sm: "block" }}
            position="absolute"
            right={10}
            top="50%"
            transform="translateY(-50%)"
            w={48}
            h={48}
          >
            <Box
              position="absolute"
              inset={0}
              bg="rgba(59,130,246,0.2)"
              rounded="full"
              filter="blur(24px)"
            />
            <Box
              className="spin-slow"
              position="relative"
              w="full"
              h="full"
              border="4px dashed"
              borderColor="rgba(255,255,255,0.2)"
              rounded="full"
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
