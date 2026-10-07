"use client";

import { Box, Flex, Heading, Text, VStack, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { applicationsService } from "@/utils/api";

export default function Admission({
  subtitle = "ПОСТУПЛЕНИЕ",
  title = "Хотите узнать больше о поступлении?",
  description = "Оставьте заявку — мы расскажем о программе обучения, условиях поступления и ответим на вопросы.",
  buttonText = "Подать заявку →",
  applyUrl = "/apply"
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Укажите имя",
        description: "Пожалуйста, введите ваше имя",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    if (phone.trim().length < 9) {
      toast({
        title: "Укажите номер телефона",
        description: "Номер должен содержать минимум 9 цифр",
        status: "warning",
        duration: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      await applicationsService.submitApplication({
        fullName: name.trim(),
        phone: phone.trim(),
        type: "consultation",
        childGrade: "Не указан (быстрая заявка)",
        message: "Быстрая заявка из блока Поступление на главной странице",
      });
      setSubmitted(true);
      toast({
        title: "Заявка успешно принята!",
        description: "Наш координатор свяжется с вами в ближайшее время.",
        status: "success",
        duration: 5000,
      });
    } catch (err) {
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, позвоните нам по номеру +998 (91) 325-95-65",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

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
            {submitted ? (
              <VStack spacing={4} py={4} textAlign="center">
                <Box
                  w={12}
                  h={12}
                  rounded="full"
                  bg="green.50"
                  color="green.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  ✓
                </Box>
                <Heading as="h4" size="md" color="#002045">
                  Заявка принята!
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Мы свяжемся с вами в течение рабочего дня.
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setPhone("+998 ");
                  }}
                >
                  Отправить еще одну
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} as="form" onSubmit={handleQuickSubmit}>
                <Input
                  placeholder="Ваше имя"
                  size="lg"
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  _focus={{ borderColor: "#002045", bg: "white" }}
                />
                <Input
                  placeholder="Номер телефона"
                  size="lg"
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  _focus={{ borderColor: "#002045", bg: "white" }}
                />
                <Button
                  type="submit"
                  w="full"
                  size="lg"
                  bg="#002045"
                  color="white"
                  isLoading={loading}
                  loadingText="Отправка..."
                  _hover={{ bg: "#001530" }}
                >
                  {buttonText}
                </Button>
              </VStack>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
