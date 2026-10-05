"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Badge,
  Input,
  Textarea,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AdminToast, { useAdminToast } from "@/components/admin/AdminToast";

const REGIONS = [
  { id: "all", label: "Все регионы" },
  { id: "usa", label: "США (Ivy League & Top US)" },
  { id: "europe", label: "Великобритания и Европа" },
  { id: "asia", label: "Азия и Сингапур" },
  { id: "uzbekistan", label: "Международные вузы в Ташкенте" },
];

const INITIAL_UNIVERSITIES = [
  {
    id: 1,
    name: "Harvard University",
    country: "США",
    region: "usa",
    city: "Кембридж, Массачусетс",
    ranking: "QS #4 в мире",
    majors: ["Computer Science", "Economics", "Applied Mathematics"],
    scholarship: "Full Ride ($82,000/год)",
    color: "#A51C30",
    graduates: "3 выпускника",
    logoLetter: "H",
    logoUrl: "",
  },
  {
    id: 2,
    name: "University of Oxford",
    country: "Великобритания",
    region: "europe",
    city: "Оксфорд",
    ranking: "QS #3 в мире",
    majors: ["Philosophy, Politics and Economics", "Biomedical Sciences"],
    scholarship: "Clarendon Scholarship",
    color: "#002147",
    graduates: "2 выпускника",
    logoLetter: "O",
    logoUrl: "",
  },
  {
    id: 3,
    name: "University of Cambridge",
    country: "Великобритания",
    region: "europe",
    city: "Кембридж",
    ranking: "QS #2 в мире",
    majors: ["Natural Sciences", "Engineering", "Mathematics"],
    scholarship: "Cambridge Trust Grant",
    color: "#D6083B",
    graduates: "3 выпускника",
    logoLetter: "C",
    logoUrl: "",
  },
  {
    id: 4,
    name: "MIT (Massachusetts Institute of Technology)",
    country: "США",
    region: "usa",
    city: "Бостон, Массачусетс",
    ranking: "QS #1 в мире",
    majors: ["Artificial Intelligence & CS", "Robotics Engineering"],
    scholarship: "Need-based Grant ($78,000/год)",
    color: "#7B1113",
    graduates: "2 выпускника",
    logoLetter: "M",
    logoUrl: "",
  },
  {
    id: 5,
    name: "Stanford University",
    country: "США",
    region: "usa",
    city: "Пало-Альто, Калифорния",
    ranking: "QS #5 в мире",
    majors: ["Management Science & Engineering", "Computer Systems"],
    scholarship: "Knight-Hennessy Scholars",
    color: "#8C1515",
    graduates: "2 выпускника",
    logoLetter: "S",
    logoUrl: "",
  },
  {
    id: 6,
    name: "Imperial College London",
    country: "Великобритания",
    region: "europe",
    city: "Лондон",
    ranking: "QS #6 в мире",
    majors: ["Computing (Software Engineering)", "Civil Engineering"],
    scholarship: "President's Undergraduate Scholarship",
    color: "#003E74",
    graduates: "4 выпускника",
    logoLetter: "I",
    logoUrl: "",
  },
  {
    id: 7,
    name: "National University of Singapore (NUS)",
    country: "Сингапур",
    region: "asia",
    city: "Сингапур",
    ranking: "QS #8 в мире",
    majors: ["Data Science & Analytics", "Business Administration"],
    scholarship: "ASEAN Undergraduate Grant",
    color: "#EF7C00",
    graduates: "3 выпускника",
    logoLetter: "N",
    logoUrl: "",
  },
  {
    id: 8,
    name: "New York University (NYU Abu Dhabi)",
    country: "ОАЭ / США",
    region: "asia",
    city: "Абу-Даби",
    ranking: "Top Global",
    majors: ["Interactive Media", "Economics & Finance"],
    scholarship: "Full Tuition + Housing ($85,000/год)",
    color: "#57068C",
    graduates: "5 выпускников",
    logoLetter: "NYU",
    logoUrl: "",
  },
  {
    id: 9,
    name: "KAIST (Korea Advanced Institute of Science and Tech)",
    country: "Южная Корея",
    region: "asia",
    city: "Тэджон",
    ranking: "QS #56 в мире",
    majors: ["Electrical Engineering", "Bio & Brain Engineering"],
    scholarship: "KAIST Full Scholarship + Monthly Stipend",
    color: "#004183",
    graduates: "2 выпускника",
    logoLetter: "K",
    logoUrl: "",
  },
  {
    id: 10,
    name: "Westminster International University in Tashkent (WIUT)",
    country: "Узбекистан",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Лидер британского образования в ЦА",
    majors: ["Business Information Systems", "Finance", "Commercial Law"],
    scholarship: "Государственный грант / Ректорский грант",
    color: "#002B49",
    graduates: "18 выпускников",
    logoLetter: "W",
    logoUrl: "",
  },
  {
    id: 11,
    name: "Inha University in Tashkent (IUT)",
    country: "Узбекистан",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Ведущий IT-университет",
    majors: ["Computer and Information Engineering", "Logistics"],
    scholarship: "100% Академический грант",
    color: "#005BAC",
    graduates: "14 выпускников",
    logoLetter: "IUT",
    logoUrl: "",
  },
  {
    id: 12,
    name: "New Uzbekistan University",
    country: "Узбекистан",
    region: "uzbekistan",
    city: "Ташкент",
    ranking: "Президентский технологический университет",
    majors: ["Chemical & Materials Engineering", "Software Engineering"],
    scholarship: "Президентский грант",
    color: "#006644",
    graduates: "8 выпускников",
    logoLetter: "NU",
    logoUrl: "",
  },
];

export default function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUni, setEditingUni] = useState(null);
  const { toast, toastData } = useAdminToast();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    region: "usa",
    ranking: "",
    majors: "",
    scholarship: "",
    graduates: "",
    color: "#002045",
    logoLetter: "",
    logoUrl: "",
  });

  const loadData = () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("ngs_custom_universities");
      if (stored) {
        setUniversities(JSON.parse(stored));
      } else {
        setUniversities(INITIAL_UNIVERSITIES);
      }
    } catch (e) {
      setUniversities(INITIAL_UNIVERSITIES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const persist = (list) => {
    try {
      localStorage.setItem("ngs_custom_universities", JSON.stringify(list));
    } catch (e) {}
  };

  const openModal = (uni = null) => {
    if (uni) {
      setEditingUni(uni);
      setFormData({
        name: uni.name || "",
        country: uni.country || "",
        city: uni.city || "",
        region: uni.region || "usa",
        ranking: uni.ranking || "",
        majors: Array.isArray(uni.majors) ? uni.majors.join(", ") : uni.majors || "",
        scholarship: uni.scholarship || "",
        graduates: uni.graduates || "",
        color: uni.color || "#002045",
        logoLetter: uni.logoLetter || "",
        logoUrl: uni.logoUrl || "",
      });
    } else {
      setEditingUni(null);
      setFormData({
        name: "",
        country: "США",
        city: "",
        region: "usa",
        ranking: "QS Top 50",
        majors: "Computer Science, Economics",
        scholarship: "Full Scholarship",
        graduates: "2 выпускника",
        color: "#002045",
        logoLetter: "U",
        logoUrl: "",
      });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingUni(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.country.trim()) {
      toast({
        title: "Заполните обязательные поля",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    const majorsArr = typeof formData.majors === "string"
      ? formData.majors.split(",").map((m) => m.trim()).filter(Boolean)
      : formData.majors;

    const payload = {
      ...formData,
      majors: majorsArr,
      logoLetter: formData.logoLetter || formData.name.charAt(0).toUpperCase(),
    };

    let updated = [...universities];
    if (editingUni) {
      updated = updated.map((u) => (u.id === editingUni.id ? { ...u, ...payload } : u));
      toast({
        title: "Вуз обновлен",
        status: "success",
        duration: 2000,
      });
    } else {
      const newUni = { id: Date.now(), ...payload };
      updated.push(newUni);
      toast({
        title: "Вуз успешно добавлен",
        status: "success",
        duration: 2000,
      });
    }

    setUniversities(updated);
    persist(updated);
    closeModal();
  };

  const handleDelete = (id, name) => {
    if (!confirm(`Удалить университет "${name}"?`)) return;
    const updated = universities.filter((u) => u.id !== id);
    setUniversities(updated);
    persist(updated);
    toast({
      title: "Университет удален",
      status: "info",
      duration: 2000,
    });
  };

  const handleResetDefaults = () => {
    if (!confirm("Сбросить список вузов к исходному эталонному списку?")) return;
    localStorage.removeItem("ngs_custom_universities");
    setUniversities(INITIAL_UNIVERSITIES);
    toast({
      title: "Список восстановлен по умолчанию",
      status: "success",
      duration: 2000,
    });
  };

  const filtered = universities.filter((u) => {
    const matchRegion = selectedRegion === "all" || u.region === selectedRegion;
    const matchSearch =
      !search.trim() ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <Heading size="lg" color="#002045">
            Университеты и институты поступления
          </Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            Управление каталогом мировых и локальных вузов, грантов и направлений подготовки
          </Text>
        </Box>
        <HStack spacing={3}>
          <Button size="sm" variant="outline" onClick={handleResetDefaults}>
            Сбросить по умолчанию
          </Button>
          <Button
            bg="#002045"
            color="white"
            _hover={{ bg: "#003366" }}
            onClick={() => openModal()}
          >
            <HStack spacing={2}>
              <span className="material-symbols-outlined">add</span>
              <Text>Добавить вуз</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Filter and Search */}
      <Flex gap={4} mb={6} flexWrap="wrap" align="center" justify="space-between">
        <HStack spacing={2} overflowX="auto" pb={2}>
          {REGIONS.map((r) => (
            <Button
              key={r.id}
              size="sm"
              rounded="xl"
              variant={selectedRegion === r.id ? "solid" : "outline"}
              bg={selectedRegion === r.id ? "#002045" : "transparent"}
              color={selectedRegion === r.id ? "white" : "gray.600"}
              borderColor={selectedRegion === r.id ? "#002045" : "gray.200"}
              _hover={{ bg: selectedRegion === r.id ? "#001835" : "gray.50" }}
              onClick={() => setSelectedRegion(r.id)}
            >
              {r.label}
            </Button>
          ))}
        </HStack>

        <Box w={{ base: "full", md: "260px" }}>
          <Input
            placeholder="Поиск вуза, города, страны..."
            size="sm"
            rounded="xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Flex>

      {/* Grid of Universities */}
      {isLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : filtered.length === 0 ? (
        <Box textAlign="center" py={12} bg="white" rounded="2xl" border="1px dashed" borderColor="gray.200">
          <Text color="gray.500" mb={3}>Университеты не найдены</Text>
          <Button size="sm" onClick={() => openModal()}>Добавить университет</Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filtered.map((u) => (
            <Box
              key={u.id}
              bg="white"
              rounded="2xl"
              p={6}
              border="1px solid"
              borderColor="gray.100"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              transition="all 0.2s"
              display="flex"
              flexDirection="column"
            >
              <Flex align="center" gap={3} mb={3}>
                <Flex
                  w={12}
                  h={12}
                  rounded="xl"
                  bg={u.color || "#002045"}
                  color="white"
                  align="center"
                  justify="center"
                  fontWeight="bold"
                  fontSize="lg"
                  flexShrink={0}
                  overflow="hidden"
                >
                  {u.logoUrl ? (
                    <img src={u.logoUrl} alt={u.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    u.logoLetter || u.name.charAt(0)
                  )}
                </Flex>
                <Box flex={1}>
                  <Heading size="sm" color="#002045" lineHeight="1.3">
                    {u.name}
                  </Heading>
                  <Text fontSize="xs" color="gray.500">
                    📍 {u.city}, {u.country}
                  </Text>
                </Box>
              </Flex>

              <HStack spacing={2} mb={3} wrap="wrap">
                {u.ranking && (
                  <Badge bg="blue.50" color="blue.700" fontSize="xs" px={2} py={0.5} rounded="md">
                    {u.ranking}
                  </Badge>
                )}
                {u.graduates && (
                  <Badge bg="green.50" color="green.700" fontSize="xs" px={2} py={0.5} rounded="md">
                    🎓 {u.graduates}
                  </Badge>
                )}
              </HStack>

              {u.scholarship && (
                <Box p={2.5} bg="yellow.50" border="1px solid" borderColor="yellow.200" rounded="lg" mb={3}>
                  <Text fontSize="11px" fontWeight="bold" color="yellow.900">
                    💰 Стипендия: {u.scholarship}
                  </Text>
                </Box>
              )}

              <Box mb={4} flex={1}>
                <Text fontSize="xs" color="gray.400" mb={1} fontWeight="medium">
                  Специальности:
                </Text>
                <HStack spacing={1} wrap="wrap">
                  {(Array.isArray(u.majors) ? u.majors : []).map((m, idx) => (
                    <Badge key={idx} variant="outline" colorScheme="gray" fontSize="10px">
                      {m}
                    </Badge>
                  ))}
                </HStack>
              </Box>

              <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="gray.100">
                <Button size="xs" variant="ghost" colorScheme="blue" onClick={() => openModal(u)}>
                  Редактировать
                </Button>
                <Button size="xs" variant="ghost" color="red.500" _hover={{ bg: "red.50" }} onClick={() => handleDelete(u.id, u.name)}>
                  Удалить
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Modal */}
      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={closeModal}
        >
          <Box
            bg="white"
            rounded="2xl"
            maxW="560px"
            w="full"
            p={6}
            boxShadow="2xl"
            maxH="90vh"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md" color="#002045">
                {editingUni ? "Редактировать университет" : "Добавить университет"}
              </Heading>
              <Button size="sm" variant="ghost" onClick={closeModal}>✕</Button>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Название университета / института *
                </Text>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Harvard University"
                />
              </Box>

              <Flex gap={4} mb={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Страна *
                  </Text>
                  <Input
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="США"
                  />
                </Box>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Город
                  </Text>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Кембридж, Массачусетс"
                  />
                </Box>
              </Flex>

              <Flex gap={4} mb={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Регион
                  </Text>
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      border: "1px solid #CBD5E1",
                      background: "#fff",
                      fontSize: "14px",
                      color: "#1E293B",
                      outline: "none",
                    }}
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  >
                    <option value="usa">США</option>
                    <option value="europe">Великобритания и Европа</option>
                    <option value="asia">Азия и Сингапур</option>
                    <option value="uzbekistan">Узбекистан</option>
                  </select>
                </Box>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Рейтинг (QS / Times)
                  </Text>
                  <Input
                    value={formData.ranking}
                    onChange={(e) => setFormData({ ...formData, ranking: e.target.value })}
                    placeholder="QS #4 в мире"
                  />
                </Box>
              </Flex>

              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Направления / Специальности (через запятую)
                </Text>
                <Input
                  value={formData.majors}
                  onChange={(e) => setFormData({ ...formData, majors: e.target.value })}
                  placeholder="Computer Science, Economics, Applied Mathematics"
                />
              </Box>

              <Flex gap={4} mb={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Стипендия / Грант
                  </Text>
                  <Input
                    value={formData.scholarship}
                    onChange={(e) => setFormData({ ...formData, scholarship: e.target.value })}
                    placeholder="Full Ride ($82,000/год)"
                  />
                </Box>
                <Box w="140px">
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Выпускники
                  </Text>
                  <Input
                    value={formData.graduates}
                    onChange={(e) => setFormData({ ...formData, graduates: e.target.value })}
                    placeholder="3 выпускника"
                  />
                </Box>
              </Flex>

              <Flex gap={4} mb={6}>
                <Box w="120px">
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Буква лого
                  </Text>
                  <Input
                    value={formData.logoLetter}
                    onChange={(e) => setFormData({ ...formData, logoLetter: e.target.value })}
                    placeholder="H"
                  />
                </Box>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    URL фото или логотипа (опционально)
                  </Text>
                  <Input
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://... или /images/..."
                  />
                </Box>
                <Box w="100px">
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Цвет
                  </Text>
                  <Input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    h="40px"
                    p={1}
                    cursor="pointer"
                  />
                </Box>
              </Flex>

              <Flex justify="flex-end" gap={3}>
                <Button variant="ghost" onClick={closeModal}>Отмена</Button>
                <Button type="submit" bg="#002045" color="white" _hover={{ bg: "#003366" }}>
                  {editingUni ? "Сохранить" : "Добавить"}
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      )}

      <AdminToast toast={toastData} />
    </Box>
  );
}
