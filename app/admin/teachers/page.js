"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  SimpleGrid,
  Input,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { teachersService, mediaService } from "@/utils/api";
import AdminToast, { useAdminToast } from "@/components/admin/AdminToast";

const DEPARTMENTS = [
  { id: "leadership", label: "Руководство школы" },
  { id: "exact", label: "Точные и IT науки" },
  { id: "languages", label: "Иностранные языки (Cambridge)" },
  { id: "primary", label: "Начальное и дошкольное образование" },
  { id: "humanities", label: "Гуманитарные науки" },
  { id: "sports", label: "Спорт и творчество" },
  { id: "all", label: "Общая кафедра" },
];

const INITIAL_TEACHERS = [
  {
    id: 1,
    name: "Галина Алексеевна",
    subject: "Руководство школы",
    role: "Учредитель и директор школы",
    desc: "Учредитель и директор школы НОУ «Новое Поколение», лидер развития образования с 25-летним стажем руководства образовательными проектами.",
    department: "leadership",
    imageUrl: "/images/teachers/galina.jpg",
    order: 1,
  },
  {
    id: 2,
    name: "Диляфруз Ганиевна",
    subject: "Математика и логика",
    role: "Ведущий преподаватель математики",
    desc: "Ведущий преподаватель математики, подготовка к республиканским олимпиадам и международным экзаменам SAT / Cambridge Math.",
    department: "exact",
    imageUrl: "/images/teachers/dilafruz.jpg",
    order: 2,
  },
  {
    id: 3,
    name: "Нигора Усмановна",
    subject: "Английский язык",
    role: "Зав. кафедры английского языка",
    desc: "Учитель и зав. кафедры английского языка, сертификация Cambridge Assessment English, подготовка к IELTS и TOEFL.",
    department: "languages",
    imageUrl: "/images/teachers/nigora.jpg",
    order: 3,
  },
  {
    id: 4,
    name: "Альбина Николаевна",
    subject: "Начальные классы",
    role: "Классный руководитель младшей школы",
    desc: "Сильный преподаватель начального образования, индивидуальный подход, адаптационные методики и любовь к каждому ученику.",
    department: "primary",
    imageUrl: "/images/teachers/albina.jpg",
    order: 4,
  },
  {
    id: 5,
    name: "Алишер Махмудович",
    subject: "Робототехника и IT",
    role: "Руководитель лаборатории робототехники",
    desc: "Тренер школьной сборной по робототехнике, практическое обучение Python, Arduino, C++ и 3D-моделированию.",
    department: "exact",
    imageUrl: "/images/programs/high.jpg",
    order: 5,
  },
  {
    id: 6,
    name: "Елена Сергеевна",
    subject: "Русский язык и литература",
    role: "Учитель высшей категории",
    desc: "Эксперт в развитии критического мышления, ораторского мастерства и углубленного анализа мировой литературы.",
    department: "humanities",
    imageUrl: "/images/teachers/albina.jpg",
    order: 6,
  },
  {
    id: 7,
    name: "Рустам Камилович",
    subject: "Физика и прикладная инженерия",
    role: "Преподаватель физики",
    desc: "Практические лабораторные эксперименты, олимпиадная физика и развитие инженерного мышления.",
    department: "exact",
    imageUrl: "/images/programs/middle.jpg",
    order: 7,
  },
  {
    id: 8,
    name: "Шахноза Баходировна",
    subject: "Химия и биология",
    role: "Зав. естественно-научной лабораторией",
    desc: "Интерактивная био-лаборатория, микроскопия, экологические проекты и победы на олимпиадах.",
    department: "exact",
    imageUrl: "/images/teachers/nigora.jpg",
    order: 8,
  },
  {
    id: 9,
    name: "Малика Рустамовна",
    subject: "История и обществознание",
    role: "Преподаватель истории",
    desc: "Углубленное изучение всемирной истории, истории Узбекистана, развитие дискуссионного клуба.",
    department: "humanities",
    imageUrl: "/images/teachers/albina.jpg",
    order: 9,
  },
  {
    id: 10,
    name: "Джамшид Тимурович",
    subject: "Физическое воспитание и спорт",
    role: "Мастер спорта, главный тренер",
    desc: "Организация спортивных секций (футбол, баскетбол, плавание), развитие командного духа.",
    department: "sports",
    imageUrl: "/images/teachers/galina.jpg",
    order: 10,
  },
];

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const { toast, toastData } = useAdminToast();

  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    role: "",
    department: "exact",
    desc: "",
    imageUrl: "/images/teachers/galina.jpg",
    order: 0,
  });

  const getSavedTeachers = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ngs_custom_teachers");
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    return INITIAL_TEACHERS;
  };

  const persistLocalTeachers = (list) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ngs_custom_teachers", JSON.stringify(list));
      } catch (e) {}
    }
  };

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const res = await teachersService.getAllAdmin();
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setTeachers(res.data);
        persistLocalTeachers(res.data);
        return;
      }
    } catch (error) {
      console.warn("Backend teachers endpoint offline or 404, using cached/fallback faculty.");
    } finally {
      setIsLoading(false);
    }

    const localList = getSavedTeachers();
    setTeachers(localList);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openModal = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name || "",
        subject: teacher.subject || "",
        role: teacher.role || "",
        department: teacher.department || "exact",
        desc: teacher.desc || "",
        imageUrl: teacher.imageUrl || "/images/teachers/galina.jpg",
        order: teacher.order || 0,
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        name: "",
        subject: "",
        role: "",
        department: "exact",
        desc: "",
        imageUrl: "/images/teachers/galina.jpg",
        order: teachers.length + 1,
      });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingTeacher(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await mediaService.uploadMedia(file);
      if (res?.data?.url) {
        setFormData((prev) => ({ ...prev, imageUrl: res.data.url }));
        toast({
          title: "Фото загружено",
          status: "success",
          duration: 2000,
        });
      }
    } catch (err) {
      // If remote upload endpoint fails, read as Data URL for instant preview & persistence
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({ ...prev, imageUrl: event.target.result }));
          toast({
            title: "Фото добавлено",
            status: "success",
            duration: 2000,
          });
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.subject.trim()) {
      toast({
        title: "Заполните обязательные поля",
        description: "Имя и предмет обязательны для заполнения",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      let updatedList = [...teachers];

      if (editingTeacher) {
        // Try backend
        try {
          await teachersService.updateTeacher(editingTeacher.id, formData);
        } catch (err) {
          console.warn("Backend update skipped/failed, updating client state.");
        }
        updatedList = updatedList.map((t) =>
          t.id === editingTeacher.id ? { ...t, ...formData } : t
        );
        toast({
          title: "Учитель обновлен",
          status: "success",
          duration: 2000,
        });
      } else {
        const newId = Date.now();
        const newTeacher = { id: newId, ...formData };
        try {
          const res = await teachersService.createTeacher(formData);
          if (res?.data?.id) newTeacher.id = res.data.id;
        } catch (err) {
          console.warn("Backend create skipped/failed, updating client state.");
        }
        updatedList.push(newTeacher);
        toast({
          title: "Учитель добавлен",
          status: "success",
          duration: 2000,
        });
      }

      setTeachers(updatedList);
      persistLocalTeachers(updatedList);
      closeModal();
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: error.response?.data?.message || "Произошла ошибка при сохранении",
        status: "error",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Вы уверены, что хотите удалить преподавателя "${name}"?`)) return;

    try {
      try {
        await teachersService.deleteTeacher(id);
      } catch (err) {}
      const updatedList = teachers.filter((t) => t.id !== id);
      setTeachers(updatedList);
      persistLocalTeachers(updatedList);
      toast({
        title: "Учитель удален",
        status: "info",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Ошибка удаления",
        status: "error",
        duration: 3000,
      });
    }
  };

  const resolveImage = (url) => {
    if (!url) return "/images/teachers/galina.jpg";
    if (url.startsWith("/images/") || url.startsWith("data:")) return url;
    if (url.startsWith("/")) {
      const base = process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
        : "https://new-generation-school.onrender.com";
      return `${base}${url}`;
    }
    return url;
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <Heading size="lg" color="#002045">Педагогический состав</Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            Управление преподавателями школы, квалификацией, фотографиями и кафедрами
          </Text>
        </Box>
        <Button
          bg="#002045"
          color="white"
          _hover={{ bg: "#003366" }}
          onClick={() => openModal()}
        >
          <HStack spacing={2}>
            <span className="material-symbols-outlined">add</span>
            <Text>Добавить учителя</Text>
          </HStack>
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {teachers.map((teacher) => (
            <Box
              key={teacher.id}
              bg="white"
              rounded="2xl"
              border="1px solid"
              borderColor="gray.100"
              overflow="hidden"
              boxShadow="sm"
              _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              display="flex"
              flexDirection="column"
            >
              <Box position="relative" h="240px" bg="gray.100" overflow="hidden">
                <img
                  src={resolveImage(teacher.imageUrl)}
                  alt={teacher.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "/images/teachers/galina.jpg";
                  }}
                />
                <Box
                  position="absolute"
                  top={3}
                  right={3}
                  bg="white"
                  px={2.5}
                  py={1}
                  rounded="full"
                  fontSize="xs"
                  fontWeight="bold"
                  color="#002045"
                  boxShadow="sm"
                >
                  #{teacher.order || 0}
                </Box>
              </Box>

              <Box p={5} flex={1} display="flex" flexDirection="column">
                <Badge
                  alignSelf="flex-start"
                  mb={2}
                  bg="blue.50"
                  color="blue.700"
                  fontSize="xs"
                  px={2}
                  py={0.5}
                  rounded="md"
                >
                  {DEPARTMENTS.find((d) => d.id === teacher.department)?.label || teacher.department}
                </Badge>

                <Heading size="md" color="#002045" mb={1} lineHeight="1.3">
                  {teacher.name}
                </Heading>

                <Text fontSize="sm" fontWeight="semibold" color="blue.600" mb={2}>
                  {teacher.subject}
                </Text>

                {teacher.role && (
                  <Text fontSize="xs" fontWeight="medium" color="gray.500" mb={3}>
                    {teacher.role}
                  </Text>
                )}

                <Text fontSize="xs" color="gray.600" noOfLines={3} mb={4} flex={1}>
                  {teacher.desc || "Описание отсутствует"}
                </Text>

                <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="gray.100">
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => openModal(teacher)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    color="red.500"
                    _hover={{ bg: "red.50" }}
                    onClick={() => handleDelete(teacher.id, teacher.name)}
                  >
                    Удалить
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Modal Edit/Create */}
      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0, 0, 0, 0.5)"
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
            maxW="600px"
            w="full"
            p={6}
            boxShadow="2xl"
            maxH="90vh"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md" color="#002045">
                {editingTeacher ? "Редактировать преподавателя" : "Добавить преподавателя"}
              </Heading>
              <Button size="sm" variant="ghost" onClick={closeModal}>
                ✕
              </Button>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  ФИО преподавателя *
                </Text>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Галина Алексеевна"
                />
              </Box>

              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Предмет / Направление *
                </Text>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Математика и логика"
                />
              </Box>

              <Flex gap={4} mb={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Кафедра
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
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </Box>

                <Box w="120px">
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Порядок
                  </Text>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  />
                </Box>
              </Flex>

              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Должность / Звание
                </Text>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Учредитель и директор / Зав. кафедры"
                />
              </Box>

              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Фотография преподавателя
                </Text>
                <Flex gap={3} align="center" mb={2}>
                  <Box
                    w="56px"
                    h="56px"
                    rounded="lg"
                    overflow="hidden"
                    bg="gray.100"
                    border="1px solid"
                    borderColor="gray.200"
                    flexShrink={0}
                  >
                    <img
                      src={resolveImage(formData.imageUrl)}
                      alt="Превью"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.src = "/images/teachers/galina.jpg";
                      }}
                    />
                  </Box>

                  <Input
                    flex={1}
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/teachers/galina.jpg или ссылка"
                    size="sm"
                  />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    isLoading={uploadingImage}
                  >
                    Загрузить
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </Flex>

                <Text fontSize="xs" color="gray.500" mb={1}>
                  Быстрый выбор фото:
                </Text>
                <HStack spacing={2} wrap="wrap">
                  {[
                    { label: "Галина", url: "/images/teachers/galina.jpg" },
                    { label: "Диляфруз", url: "/images/teachers/dilafruz.jpg" },
                    { label: "Нигора", url: "/images/teachers/nigora.jpg" },
                    { label: "Альбина", url: "/images/teachers/albina.jpg" },
                    { label: "IT / Робототехника", url: "/images/programs/high.jpg" },
                    { label: "Физика", url: "/images/programs/middle.jpg" },
                  ].map((preset) => (
                    <Button
                      key={preset.url}
                      size="xs"
                      variant="ghost"
                      bg="gray.100"
                      _hover={{ bg: "gray.200" }}
                      onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </HStack>
              </Box>

              <Box mb={6}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Биография и достижения
                </Text>
                <Textarea
                  rows={4}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Стаж, награды, педагогический опыт, авторские программы..."
                />
              </Box>

              <Flex justify="flex-end" gap={3}>
                <Button variant="ghost" onClick={closeModal}>
                  Отмена
                </Button>
                <Button
                  type="submit"
                  bg="#002045"
                  color="white"
                  _hover={{ bg: "#003366" }}
                  isLoading={isSubmitting}
                >
                  {editingTeacher ? "Сохранить изменения" : "Создать"}
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
