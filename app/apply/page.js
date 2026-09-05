"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Grid,
  GridItem,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { applicationsService } from "@/utils/api";

export default function ApplyPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+998 ",
    email: "",
    childGrade: "1 класс",
    type: "admission",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Пожалуйста, укажите ваше имя.");
      return;
    }

    if (formData.phone.trim().length < 9) {
      setErrorMessage("Пожалуйста, укажите корректный номер телефона.");
      return;
    }

    setLoading(true);
    try {
      await applicationsService.submitApplication(formData);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      setErrorMessage("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или позвоните нам по телефону.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="#EEF2F6" display="flex" flexDirection="column">
      <Navbar />

      {/* Hero Header */}
      <Box
        pt={{ base: 32, md: 36 }}
        pb={{ base: 10, md: 14 }}
        px={{ base: 4, sm: 6, md: 12 }}
        textAlign="center"
        bg="linear-gradient(180deg, rgba(0, 32, 69, 0.04) 0%, rgba(253, 251, 247, 0) 100%)"
      >
        <Box maxW="3xl" mx="auto">
          <Flex
            display="inline-flex"
            align="center"
            gap={2}
            px={4}
            py={1.5}
            rounded="full"
            bg="rgba(255, 184, 0, 0.15)"
            border="1px solid rgba(255, 184, 0, 0.3)"
            mb={4}
          >
            <Box as="span" className="material-symbols-outlined" color="#D4AF37" fontSize="sm">
              school
            </Box>
            <Text
              as="span"
              color="#002045"
              fontWeight="bold"
              fontSize="xs"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Приемная кампания · New Generation
            </Text>
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="800"
            color="#002045"
            lineHeight="1.15"
            letterSpacing="tight"
            mb={4}
          >
            Подать заявку на поступление
          </Heading>

          <Text color="#64748B" fontSize={{ base: "sm", md: "lg" }} maxW="2xl" mx="auto">
            Оставьте заявку, чтобы получить персональную консультацию, узнать условия поступления или записаться на экскурсию по кампусу.
          </Text>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box maxW="6xl" mx="auto" w="full" px={{ base: 4, sm: 6, md: 12 }} pb={20} flex={1}>
        <Grid templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }} gap={{ base: 8, lg: 12 }}>
          {/* Left Column: The Form or Success Box */}
          <GridItem>
            <Box
              bg="rgba(255, 255, 255, 0.9)"
              backdropFilter="blur(20px)"
              p={{ base: 6, sm: 8, md: 10 }}
              rounded="3xl"
              border="1px solid rgba(0, 32, 69, 0.08)"
              boxShadow="0 10px 40px -10px rgba(0, 32, 69, 0.06)"
            >
              {submitted ? (
                <VStack spacing={6} py={12} textAlign="center">
                  <Flex
                    w={20}
                    h={20}
                    rounded="full"
                    bg="green.50"
                    color="green.500"
                    align="center"
                    justify="center"
                    border="2px solid"
                    borderColor="green.200"
                  >
                    <Box as="span" className="material-symbols-outlined" fontSize="4xl">
                      check_circle
                    </Box>
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize="2xl" color="#002045" mb={2}>
                      Спасибо! Заявка принята
                    </Heading>
                    <Text color="#64748B" fontSize="md" maxW="md">
                      Мы получили ваше обращение. Наш координатор свяжется с вами по указанному номеру в течение рабочего дня.
                    </Text>
                  </Box>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        phone: "+998 ",
                        email: "",
                        childGrade: "1 класс",
                        type: "admission",
                        message: "",
                      });
                    }}
                    variant="outline"
                    rounded="full"
                    color="#002045"
                    borderColor="#002045"
                    px={8}
                  >
                    Отправить еще одну заявку
                  </Button>
                </VStack>
              ) : (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6} align="stretch">
                    {errorMessage && (
                      <Box p={3} rounded="xl" bg="red.50" border="1px solid" borderColor="red.200" color="red.700" fontSize="sm">
                        {errorMessage}
                      </Box>
                    )}

                    {/* Purpose Selection */}
                    <Box>
                      <Text fontWeight="bold" fontSize="sm" color="#002045" mb={2}>
                        Цель обращения
                      </Text>
                      <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }} gap={2}>
                        {[
                          { id: "admission", label: "Поступление" },
                          { id: "consultation", label: "Консультация" },
                          { id: "tour", label: "Экскурсия" },
                          { id: "question", label: "Вопрос" },
                        ].map((t) => {
                          const active = formData.type === t.id;
                          return (
                            <Button
                              key={t.id}
                              type="button"
                              size="sm"
                              rounded="xl"
                              py={5}
                              fontSize="xs"
                              fontWeight="bold"
                              bg={active ? "#002045" : "white"}
                              color={active ? "white" : "#64748B"}
                              border="1px solid"
                              borderColor={active ? "#002045" : "gray.200"}
                              _hover={{
                                bg: active ? "#001530" : "gray.50",
                                color: active ? "white" : "#002045",
                              }}
                              onClick={() => setFormData({ ...formData, type: t.id })}
                            >
                              {t.label}
                            </Button>
                          );
                        })}
                      </Grid>
                    </Box>

                    {/* Full Name */}
                    <Box>
                      <Text fontWeight="bold" fontSize="sm" color="#002045" mb={1.5}>
                        Ваше имя (родитель / опекун) *
                      </Text>
                      <Input
                        placeholder="Например: Сардор Рахимов"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        size="lg"
                        rounded="xl"
                        bg="white"
                        borderColor="gray.200"
                        _focus={{ borderColor: "#FFB800", boxShadow: "0 0 0 1px #FFB800" }}
                      />
                    </Box>

                    {/* Phone and Email */}
                    <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="#002045" mb={1.5}>
                          Номер телефона *
                        </Text>
                        <Input
                          placeholder="+998 90 123-45-67"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          size="lg"
                          rounded="xl"
                          bg="white"
                          borderColor="gray.200"
                          _focus={{ borderColor: "#FFB800", boxShadow: "0 0 0 1px #FFB800" }}
                        />
                      </Box>

                      <Box>
                        <Text fontWeight="bold" fontSize="sm" color="#002045" mb={1.5}>
                          Email (необязательно)
                        </Text>
                        <Input
                          type="email"
                          placeholder="example@mail.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          size="lg"
                          rounded="xl"
                          bg="white"
                          borderColor="gray.200"
                          _focus={{ borderColor: "#FFB800", boxShadow: "0 0 0 1px #FFB800" }}
                        />
                      </Box>
                    </Grid>

                    {/* Grade / Age */}
                    <Box>
                      <Text fontWeight="bold" fontSize="sm" color="#002045" mb={1.5}>
                        Класс / Возраст ребенка
                      </Text>
                      <select
                        style={{
                          width: "100%",
                          height: "48px",
                          borderRadius: "12px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          padding: "0 16px",
                          fontSize: "14px",
                          color: "#1E293B",
                          outline: "none",
                        }}
                        value={formData.childGrade}
                        onChange={(e) =>
                          setFormData({ ...formData, childGrade: e.target.value })
                        }
                      >
                        <option value="Дошкольное (Pre-school, 5-6 лет)">Дошкольное отделение (5-6 лет)</option>
                        <option value="1 класс">1 класс</option>
                        <option value="2 класс">2 класс</option>
                        <option value="3 класс">3 класс</option>
                        <option value="4 класс">4 класс</option>
                        <option value="5-9 классы (Средняя школа)">5-9 классы (Средняя школа)</option>
                        <option value="10-11 классы (Старшая школа)">10-11 классы (Старшая школа / IELTS / SAT)</option>
                      </select>
                    </Box>

                    {/* Comments */}
                    <Box>
                      <Text fontWeight="bold" fontSize="sm" color="#002045" mb={1.5}>
                        Комментарий или вопрос (необязательно)
                      </Text>
                      <Textarea
                        rows={3}
                        placeholder="Напишите, что вас интересует (например, условия перевода из другой школы, продленка, языки)..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rounded="xl"
                        bg="white"
                        borderColor="gray.200"
                        _focus={{ borderColor: "#FFB800", boxShadow: "0 0 0 1px #FFB800" }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      size="lg"
                      h="56px"
                      bg="#FFB800"
                      color="#002045"
                      fontWeight="800"
                      fontSize="md"
                      rounded="full"
                      isLoading={loading}
                      loadingText="Отправка заявки..."
                      boxShadow="0 10px 25px -5px rgba(255, 184, 0, 0.4)"
                      _hover={{ bg: "#e6a600", transform: "translateY(-1px)" }}
                      transition="all 0.2s"
                    >
                      Отправить заявку
                    </Button>

                    <Text fontSize="xs" color="gray.400" textAlign="center">
                      Нажимая кнопку, вы соглашаетесь на обработку контактных данных сотрудниками школы.
                    </Text>
                  </VStack>
                </form>
              )}
            </Box>
          </GridItem>

          {/* Right Column: School Info & Highlights */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Highlight Card */}
              <Box
                bg="#002045"
                color="white"
                p={{ base: 6, sm: 8 }}
                rounded="3xl"
                boxShadow="0 10px 30px -10px rgba(0, 32, 69, 0.2)"
              >
                <Heading as="h3" fontSize="xl" fontWeight="bold" mb={3} color="#FFB800">
                  Почему стоит подать заявку прямо сейчас?
                </Heading>
                <VStack align="flex-start" spacing={4} mt={4}>
                  <Flex align="flex-start" gap={3}>
                    <Box as="span" className="material-symbols-outlined" color="#FFB800" mt={0.5}>
                      done
                    </Box>
                    <Text fontSize="sm" color="gray.200">
                      <strong>Индивидуальная экскурсия:</strong> вы сможете увидеть оснащение классов, лаборатории и побеседовать с директором.
                    </Text>
                  </Flex>
                  <Flex align="flex-start" gap={3}>
                    <Box as="span" className="material-symbols-outlined" color="#FFB800" mt={0.5}>
                      done
                    </Box>
                    <Text fontSize="sm" color="gray.200">
                      <strong>Тестирование знаний:</strong> мягкое диагностическое тестирование ребенка для точного определения уровня.
                    </Text>
                  </Flex>
                  <Flex align="flex-start" gap={3}>
                    <Box as="span" className="material-symbols-outlined" color="#FFB800" mt={0.5}>
                      done
                    </Box>
                    <Text fontSize="sm" color="gray.200">
                      <strong>Ограниченные места:</strong> в каждом классе формируются малые группы до 18 учеников.
                    </Text>
                  </Flex>
                </VStack>
              </Box>

              {/* Direct Contact Card */}
              <Box
                bg="white"
                p={{ base: 6, sm: 8 }}
                rounded="3xl"
                border="1px solid rgba(0, 32, 69, 0.08)"
              >
                <Heading as="h4" fontSize="lg" fontWeight="bold" color="#002045" mb={4}>
                  Связаться с нами напрямую
                </Heading>
                <VStack align="flex-start" spacing={4}>
                  <Flex align="center" gap={3}>
                    <Flex
                      w={10}
                      h={10}
                      rounded="xl"
                      bg="rgba(0, 32, 69, 0.06)"
                      align="center"
                      justify="center"
                      color="#002045"
                    >
                      <Box as="span" className="material-symbols-outlined" fontSize="sm">
                        call
                      </Box>
                    </Flex>
                    <Box>
                      <Text fontSize="xs" color="gray.500">Приемная комиссия</Text>
                      <Text
                        fontWeight="bold"
                        color="#002045"
                        userSelect="all"
                      >
                        +998 (90) 230-29-63
                      </Text>
                    </Box>
                  </Flex>

                  <Flex align="center" gap={3}>
                    <Flex
                      w={10}
                      h={10}
                      rounded="xl"
                      bg="rgba(0, 32, 69, 0.06)"
                      align="center"
                      justify="center"
                      color="#002045"
                    >
                      <Box as="span" className="material-symbols-outlined" fontSize="sm">
                        location_on
                      </Box>
                    </Flex>
                    <Box>
                      <Text fontSize="xs" color="gray.500">Адрес кампуса</Text>
                      <Text fontWeight="bold" color="#002045" fontSize="sm">
                        г. Фергана, ул. Мустакиллик, 228
                      </Text>
                    </Box>
                  </Flex>

                  <Flex align="center" gap={3}>
                    <Flex
                      w={10}
                      h={10}
                      rounded="xl"
                      bg="rgba(0, 32, 69, 0.06)"
                      align="center"
                      justify="center"
                      color="#002045"
                    >
                      <Box as="span" className="material-symbols-outlined" fontSize="sm">
                        schedule
                      </Box>
                    </Flex>
                    <Box>
                      <Text fontSize="xs" color="gray.500">График работы</Text>
                      <Text fontWeight="bold" color="#002045" fontSize="sm">
                        Пн - Сб: 08:30 – 17:30
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
