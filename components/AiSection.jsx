"use client";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";

const DEMO_PROMPTS = [
  {
    id: "ielts",
    label: "IELTS Speaking & Essay",
    icon: "record_voice_over",
    tag: "Band 8.5 Simulator",
    prompt: "Проверь моё эссе для IELTS Writing Task 2 и спрогнозируй Band Score: 'Should artificial intelligence be integrated into secondary education?'",
    response: {
      score: "Predicted Band: 8.5",
      analysis: [
        "Task Achievement (9.0): Аргументация полностью раскрыта, обе стороны вопроса сбалансированы.",
        "Coherence & Cohesion (8.5): Использованы гибкие дискурсивные маркеры ('consequently', 'it is quintessential to acknowledge').",
        "Lexical Resource (8.5): Высокий уровень академического вокабуляра ('pedagogical paradigm', 'cognitive enhancement').",
        "Grammatical Accuracy (8.0): Рекомендуется варьировать инверсионные структуры ('Seldom do traditional methods...').",
      ],
      recommendation: "Совет: Добавь один практический пример внедрения STEM-инноваций для максимального балла 9.0.",
    },
  },
  {
    id: "feynman",
    label: "Объяснение темы (Feynman)",
    icon: "psychology",
    tag: "Cognitive Tutor",
    prompt: "Объясни квантовую суперпозицию ученику 8 класса простыми словами через жизненную аналогию.",
    response: {
      score: "Уровень сложности: 8 класс",
      analysis: [
        "Аналогия: Представь вращающуюся монетку на школьной парте. Пока она крутится на ребре, ты не можешь сказать, что это — орёл или решка. Она одновременно в обоих состояниях.",
        "В микромире: Частицы могут находиться сразу во всех возможных состояниях, пока за ними не наблюдает датчик.",
        "Коллапс волновой функции: Как только ты хлопаешь ладонью по монетке (проводишь измерение), она вынуждена выбрать одну конкретную сторону.",
      ],
      recommendation: "Вывод для урока: Суперпозиция — это не магия, а вероятностная природа Вселенной на микроуровне.",
    },
  },
  {
    id: "presentation",
    label: "Генерация презентации",
    icon: "auto_awesome",
    tag: "Slide Architect",
    prompt: "Сгенерируй структуру презентации на 5 слайдов для защиты олимпиадного проекта по зелёной энергетике.",
    response: {
      score: "Готовность слайдов: 100%",
      analysis: [
        "Слайд 1: Титульный — 'Зелёный кампус NGS: переход Ферганской долины на солнечный микрогрид'.",
        "Слайд 2: Проблема — Пиковые нагрузки на энергосеть города и углеродный след.",
        "Слайд 3: Инженерное решение — Модульные солнечные панели с адаптивным слежением за солнцем.",
        "Слайд 4: Экономика — Расчёт окупаемости проекта за 3.2 года для образовательных учреждений.",
        "Слайд 5: Демонстрация и прототип — Интерактивный макет с данными датчиков IoT.",
      ],
      recommendation: "Сгенерированы тезисы спикера и тайминг выступления: ровно 4 минуты 30 секунд.",
    },
  },
];

export default function AiSection({
  badge = "СОБСТВЕННАЯ НЕЙРОСЕТЬ ШКОЛЫ · NGS INTELLIGENCE",
  title = "EmpasisAI — Персональный искусственный интеллект школы",
  subtitle = "Уникальная распределенная нейросеть, разработанная специально под задачи и академические стандарты NGS. Интеллектуальный помощник для подготовки к IELTS, генерации проектов и глубокого понимания сложнейших предметов.",
}) {
  const [activeTab, setActiveTab] = useState(DEMO_PROMPTS[0].id);
  const currentDemo = DEMO_PROMPTS.find((p) => p.id === activeTab) || DEMO_PROMPTS[0];

  return (
    <Box
      as="section"
      id="ai-section"
      position="relative"
      py={{ base: 14, md: 20 }}
      px={{ base: 4, sm: 6, md: 12 }}
      maxW={{ base: "7xl", "2xl": "1440px" }}
      mx="auto"
    >
      {/* Anchor for smooth scroll */}
      <Box id="ai" position="absolute" top="-100px" />

      {/* Main Container Card with futuristic navy glow */}
      <Box
        position="relative"
        bg="linear-gradient(145deg, #001833 0%, #002045 60%, #001226 100%)"
        rounded="3xl"
        p={{ base: 6, sm: 8, md: 12, lg: 14 }}
        color="white"
        overflow="hidden"
        boxShadow="0 25px 60px -15px rgba(0, 32, 69, 0.45)"
        border="1px solid"
        borderColor="rgba(255, 184, 0, 0.25)"
      >
        {/* Background glow orbs */}
        <Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="500px"
          h="500px"
          bg="radial-gradient(circle, rgba(255, 184, 0, 0.15) 0%, transparent 70%)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="-10%"
          left="-5%"
          w="450px"
          h="450px"
          bg="radial-gradient(circle, rgba(0, 163, 255, 0.15) 0%, transparent 70%)"
          pointerEvents="none"
        />

        {/* Header Block */}
        <Box maxW="3xl" mb={{ base: 10, md: 14 }} position="relative" zIndex={2}>
          <Flex
            display="inline-flex"
            align="center"
            gap={2}
            px={4}
            py={1.5}
            rounded="full"
            bg="rgba(255, 184, 0, 0.12)"
            border="1px solid rgba(255, 184, 0, 0.3)"
            mb={4}
          >
            <Box
              w={2}
              h={2}
              rounded="full"
              bg="#FFB800"
              boxShadow="0 0 10px #FFB800"
            />
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wider"
              color="#FFB800"
              textTransform="uppercase"
            >
              {badge}
            </Text>
          </Flex>

          <Heading
            as="h2"
            fontSize={{ base: "28px", sm: "36px", md: "46px", lg: "52px" }}
            fontWeight="800"
            lineHeight="1.15"
            letterSpacing="tight"
            color="white"
            mb={5}
          >
            {title}
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.300"
            lineHeight="1.7"
          >
            {subtitle}
          </Text>
        </Box>

        {/* Bento Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: 5, md: 6 }}
          position="relative"
          zIndex={2}
        >
          {/* Card 1: Live Interactive Prompt & Response Simulator (7 cols) */}
          <GridItem colSpan={{ base: 1, lg: 7 }}>
            <Box
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              rounded="2xl"
              p={{ base: 5, md: 7 }}
              h="full"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.2)"
            >
              {/* Terminal Window Header */}
              <Flex
                align="center"
                justify="space-between"
                pb={4}
                mb={4}
                borderBottom="1px solid rgba(255, 255, 255, 0.1)"
                flexWrap="wrap"
                gap={2}
              >
                <HStack spacing={2}>
                  <Box w={3} h={3} rounded="full" bg="#FF5F56" />
                  <Box w={3} h={3} rounded="full" bg="#FFBD2E" />
                  <Box w={3} h={3} rounded="full" bg="#27C93F" />
                  <Text
                    fontSize="xs"
                    fontFamily="mono"
                    color="gray.400"
                    ml={2}
                  >
                    EmpasisAI Core v2.4
                  </Text>
                </HStack>

                <HStack spacing={2}>
                  <Badge
                    bg="rgba(39, 201, 63, 0.2)"
                    color="#4ADE80"
                    fontSize="10px"
                    px={2}
                    py={0.5}
                    rounded="full"
                    border="1px solid rgba(74, 222, 128, 0.3)"
                  >
                    ● 18ms Latency
                  </Badge>
                  <Badge
                    bg="rgba(255, 184, 0, 0.15)"
                    color="#FFB800"
                    fontSize="10px"
                    px={2}
                    py={0.5}
                    rounded="full"
                  >
                    Campus Distributed Mesh
                  </Badge>
                </HStack>
              </Flex>

              {/* Interactive Preset Buttons */}
              <Box mb={5}>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="#FFB800"
                  fontWeight="bold"
                  mb={2.5}
                >
                  Выберите сценарий работы:
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {DEMO_PROMPTS.map((item) => {
                    const isSelected = item.id === activeTab;
                    return (
                      <Box
                        as="button"
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        px={3.5}
                        py={2}
                        rounded="xl"
                        fontSize="xs"
                        fontWeight="semibold"
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        cursor="pointer"
                        transition="all 0.2s"
                        bg={isSelected ? "#FFB800" : "rgba(255, 255, 255, 0.08)"}
                        color={isSelected ? "#002045" : "white"}
                        border="1px solid"
                        borderColor={isSelected ? "#FFB800" : "rgba(255, 255, 255, 0.15)"}
                        _hover={{
                          bg: isSelected ? "#e6a600" : "rgba(255, 255, 255, 0.15)",
                          transform: "translateY(-1px)",
                        }}
                      >
                        <Box as="span" className="material-symbols-outlined" fontSize="16px">
                          {item.icon}
                        </Box>
                        {item.label}
                      </Box>
                    );
                  })}
                </Flex>
              </Box>

              {/* Chat Simulation Box */}
              <VStack align="stretch" spacing={3.5} flex={1}>
                {/* User Prompt */}
                <Box
                  bg="rgba(0, 0, 0, 0.35)"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  rounded="xl"
                  p={3.5}
                >
                  <Flex align="center" gap={2} mb={1}>
                    <Box
                      as="span"
                      className="material-symbols-outlined"
                      fontSize="14px"
                      color="gray.400"
                    >
                      person
                    </Box>
                    <Text fontSize="11px" color="gray.400" fontWeight="bold">
                      Запрос ученика NGS:
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="white" fontStyle="italic">
                    «{currentDemo.prompt}»
                  </Text>
                </Box>

                {/* AI Response Card */}
                <Box
                  bg="linear-gradient(135deg, rgba(0, 32, 69, 0.8) 0%, rgba(0, 48, 100, 0.6) 100%)"
                  border="1px solid rgba(255, 184, 0, 0.3)"
                  rounded="xl"
                  p={4}
                  boxShadow="0 4px 20px rgba(0, 0, 0, 0.25)"
                >
                  <Flex align="center" justify="space-between" mb={2.5}>
                    <Flex align="center" gap={2}>
                      <Box
                        w={5}
                        h={5}
                        rounded="full"
                        bg="#FFB800"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          as="span"
                          className="material-symbols-outlined"
                          fontSize="13px"
                          color="#002045"
                        >
                          smart_toy
                        </Box>
                      </Box>
                      <Text fontSize="xs" fontWeight="bold" color="#FFB800">
                        EmpasisAI Response
                      </Text>
                    </Flex>
                    <Badge bg="#FFB800" color="#002045" fontSize="11px" fontWeight="bold" px={2} py={0.5} rounded="md">
                      {currentDemo.response.score}
                    </Badge>
                  </Flex>

                  <VStack align="stretch" spacing={2} mb={3}>
                    {currentDemo.response.analysis.map((line, idx) => (
                      <Flex key={idx} align="flex-start" gap={2}>
                        <Box as="span" className="material-symbols-outlined" fontSize="16px" color="#FFB800" flexShrink={0} mt={0.5}>
                          check_circle
                        </Box>
                        <Text fontSize="xs" color="gray.200" lineHeight="1.5">
                          {line}
                        </Text>
                      </Flex>
                    ))}
                  </VStack>

                  <Box
                    p={2.5}
                    rounded="lg"
                    bg="rgba(255, 184, 0, 0.1)"
                    border="1px dashed rgba(255, 184, 0, 0.35)"
                  >
                    <Text fontSize="xs" color="#FFD54F" fontWeight="medium">
                      💡 {currentDemo.response.recommendation}
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          {/* Right Column Bento Cards (5 cols) */}
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <VStack spacing={4} h="full" justify="space-between">
              {/* Card 2: IELTS Mastery */}
              <Box
                w="full"
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(255, 255, 255, 0.12)"
                rounded="2xl"
                p={5}
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(255, 184, 0, 0.4)",
                  transform: "translateY(-2px)",
                }}
              >
                <Flex align="center" gap={3} mb={3}>
                  <Flex
                    w={11}
                    h={11}
                    rounded="xl"
                    bg="rgba(255, 184, 0, 0.15)"
                    border="1px solid rgba(255, 184, 0, 0.3)"
                    align="center"
                    justify="center"
                    color="#FFB800"
                    flexShrink={0}
                  >
                    <Box as="span" className="material-symbols-outlined" fontSize="22px">
                      record_voice_over
                    </Box>
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize="md" fontWeight="bold" color="white">
                      Подготовка к IELTS 8.5+
                    </Heading>
                    <Text fontSize="11px" color="#FFB800" fontWeight="semibold">
                      Speaking Simulator & Essay Examiner
                    </Text>
                  </Box>
                </Flex>
                <Text fontSize="xs" color="gray.300" lineHeight="1.6">
                  Интерактивные репетиции устного интервью с живым распознаванием речи и проверка сочинений по строгому регламенту Cambridge Assessment.
                </Text>
              </Box>

              {/* Card 3: Presentation Engine */}
              <Box
                w="full"
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(255, 255, 255, 0.12)"
                rounded="2xl"
                p={5}
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(0, 163, 255, 0.4)",
                  transform: "translateY(-2px)",
                }}
              >
                <Flex align="center" gap={3} mb={3}>
                  <Flex
                    w={11}
                    h={11}
                    rounded="xl"
                    bg="rgba(0, 163, 255, 0.15)"
                    border="1px solid rgba(0, 163, 255, 0.3)"
                    align="center"
                    justify="center"
                    color="#38BDF8"
                    flexShrink={0}
                  >
                    <Box as="span" className="material-symbols-outlined" fontSize="22px">
                      auto_awesome
                    </Box>
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize="md" fontWeight="bold" color="white">
                      Генерация презентаций и слайдов
                    </Heading>
                    <Text fontSize="11px" color="#38BDF8" fontWeight="semibold">
                      Академическая проектная работа
                    </Text>
                  </Box>
                </Flex>
                <Text fontSize="xs" color="gray.300" lineHeight="1.6">
                  Автоматическая структуризация тем, построение доказательной базы, тезисов спикера и подбор инфографики для уроков и международных олимпиад.
                </Text>
              </Box>

              {/* Card 4: Feynman Adaptive Explanations */}
              <Box
                w="full"
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(20px)"
                border="1px solid rgba(255, 255, 255, 0.12)"
                rounded="2xl"
                p={5}
                transition="all 0.3s"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  transform: "translateY(-2px)",
                }}
              >
                <Flex align="center" gap={3} mb={3}>
                  <Flex
                    w={11}
                    h={11}
                    rounded="xl"
                    bg="rgba(168, 85, 247, 0.15)"
                    border="1px solid rgba(168, 85, 247, 0.3)"
                    align="center"
                    justify="center"
                    color="#C084FC"
                    flexShrink={0}
                  >
                    <Box as="span" className="material-symbols-outlined" fontSize="22px">
                      psychology
                    </Box>
                  </Flex>
                  <Box>
                    <Heading as="h3" fontSize="md" fontWeight="bold" color="white">
                      Метод Фейнмана: просто о сложном
                    </Heading>
                    <Text fontSize="11px" color="#C084FC" fontWeight="semibold">
                      Адаптивная подача точных наук
                    </Text>
                  </Box>
                </Flex>
                <Text fontSize="xs" color="gray.300" lineHeight="1.6">
                  Сложные теоремы, законы физики и формулы химии переводятся на язык ярких аналогий, понятных с первого раза ученику любого класса.
                </Text>
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        {/* Bottom Feature Badges */}
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={4}
          mt={8}
          pt={6}
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          position="relative"
          zIndex={2}
        >
          <Flex align="center" gap={3}>
            <Box as="span" className="material-symbols-outlined" color="#FFB800" fontSize="20px">
              security
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="white">Приватный контур</Text>
              <Text fontSize="11px" color="gray.400">Данные учеников защищены</Text>
            </Box>
          </Flex>

          <Flex align="center" gap={3}>
            <Box as="span" className="material-symbols-outlined" color="#38BDF8" fontSize="20px">
              hub
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="white">Распределенная сеть</Text>
              <Text fontSize="11px" color="gray.400">Локальные ноды кампуса NGS</Text>
            </Box>
          </Flex>

          <Flex align="center" gap={3}>
            <Box as="span" className="material-symbols-outlined" color="#4ADE80" fontSize="20px">
              schedule
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="white">Доступ 24/7</Text>
              <Text fontSize="11px" color="gray.400">Помощь при домашних заданиях</Text>
            </Box>
          </Flex>

          <Flex align="center" gap={3}>
            <Box as="span" className="material-symbols-outlined" color="#F472B6" fontSize="20px">
              school
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="white">Учебная база NGS</Text>
              <Text fontSize="11px" color="gray.400">Синхронизация с учителями</Text>
            </Box>
          </Flex>
        </Grid>
      </Box>
    </Box>
  );
}