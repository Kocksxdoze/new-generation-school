"use client";

import { Box, Flex, Heading, Text, VStack, Input, Button } from "@chakra-ui/react";

export default function Admission({
  subtitle = "ПОСТУПЛЕНИЕ",
  title = "Хотите узнать больше о поступлении?",
  description = "Оставьте заявку — мы расскажем о программе обучения, условиях поступления и ответим на вопросы.",
  buttonText = "Подать заявку →",
  applyUrl = "#"
}) {
  return (
    <Box as="section" py={16} px={{ base: 6, md: 12 }} maxW="7xl" mx="auto">
      <Box bg="#ffb800" rounded="3xl" p={{ base: 8, md: 16 }} position="relative" overflow="hidden">
        {/* Background Pattern */}
        <Box 
          position="absolute" 
          inset={0} 
          opacity={0.1} 
          bgImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6bTEwIDEwYTIgMiAwIDEgMCAwLTRgMgAyIDAgMCAwIDAgNHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMSIvPjwvc3ZnPg==')"
        />
        
        <Flex direction={{ base: "column", lg: "row" }} justify="space-between" align="center" position="relative" zIndex={10} gap={10}>
          <VStack align="flex-start" spacing={4} maxW="2xl">
            <Text as="span" display="block" color="#002045" fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="wider">
              {subtitle}
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" color="#002045" lineHeight="1.2">
              {title}
            </Heading>
            <Text color="rgba(0, 32, 69, 0.8)" fontSize="lg" maxW="md">
              {description}
            </Text>
          </VStack>

          <Box bg="white" p={8} rounded="2xl" boxShadow="xl" w={{ base: "full", lg: "400px" }}>
            <VStack spacing={4} as="form">
              <Input placeholder="Ваше имя" size="lg" bg="gray.50" border="none" />
              <Input placeholder="Номер телефона" size="lg" bg="gray.50" border="none" />
              <Button w="full" size="lg" bg="#002045" color="white" _hover={{ bg: "#001530" }} as="a" href={applyUrl}>
                {buttonText}
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
