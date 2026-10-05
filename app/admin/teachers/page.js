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
  Select,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { teachersService, mediaService } from "@/utils/api";
import AdminToast, { useAdminToast } from "@/components/admin/AdminToast";

const DEPARTMENTS = [
  { id: "leadership", label: "Руководство школы" },
  { id: "exact", label: "Точные и естественные науки" },
  { id: "languages", label: "Иностранные языки (Cambridge)" },
  { id: "primary", label: "Начальное и дошкольное образование" },
  { id: "humanities", label: "Гуманитарные науки" },
  { id: "sports", label: "Спорт и творчество" },
  { id: "all", label: "Общая кафедра" },
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

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const res = await teachersService.getAllAdmin();
      setTeachers(res.data || []);
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось получить список учителей с сервера",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
      toast({
        title: "Ошибка загрузки изображения",
        description: "Проверьте формат или размер файла",
        status: "error",
        duration: 3000,
      });
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
      if (editingTeacher) {
        await teachersService.updateTeacher(editingTeacher.id, formData);
        toast({
          title: "Учитель обновлен",
          status: "success",
          duration: 2000,
        });
      } else {
        await teachersService.createTeacher(formData);
        toast({
          title: "Учитель добавлен",
          status: "success",
          duration: 2000,
        });
      }
      closeModal();
      fetchTeachers();
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
      await teachersService.deleteTeacher(id);
      toast({
        title: "Учитель удален",
        status: "info",
        duration: 2000,
      });
      fetchTeachers();
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
    if (url.startsWith("/images/")) return url;
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
            Управление преподавателями школы, квалификацией и распределением по кафедрам
          </Text>
        </Box>
        <Button
          colorScheme="blue"
          bg="#002045"
          color="white"
          _hover={{ bg: "#003366" }}
          leftIcon={<span className="material-symbols-outlined">add</span>}
          onClick={() => openModal()}
        >
          Добавить учителя
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
              borderColor="gray.200"
              overflow="hidden"
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "md", borderColor: "#FFB800" }}
              display="flex"
              flexDirection="column"
            >
              <Box position="relative" h="240px" bg="gray.100" overflow="hidden">
                <Box
                  as="img"
                  src={resolveImage(teacher.imageUrl)}
                  alt={teacher.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition="top center"
                  onError={(e) => {
                    e.currentTarget.src = "/images/teachers/galina.jpg";
                  }}
                />
                <Badge
                  position="absolute"
                  top={3}
                  right={3}
                  px={2.5}
                  py={1}
                  rounded="full"
                  colorScheme={teacher.department === "leadership" ? "purple" : "blue"}
                  fontSize="2xs"
                  textTransform="uppercase"
                >
                  {DEPARTMENTS.find((d) => d.id === teacher.department)?.label || teacher.department}
                </Badge>
              </Box>

              <Box p={5} flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box mb={4}>
                  <Text fontSize="xs" fontWeight="bold" color="#FFB800" textTransform="uppercase" mb={1}>
                    {teacher.subject}
                  </Text>
                  <Heading as="h4" size="sm" color="#002045" mb={1}>
                    {teacher.name}
                  </Heading>
                  {teacher.role && (
                    <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={2}>
                      {teacher.role}
                    </Text>
                  )}
                  {teacher.desc && (
                    <Text fontSize="xs" color="gray.500" noOfLines={3}>
                      {teacher.desc}
                    </Text>
                  )}
                </Box>

                <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="2xs" color="gray.400">
                    Порядок: {teacher.order}
                  </Text>
                  <HStack spacing={2}>
                    <Button
                      size="xs"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => openModal(teacher)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDelete(teacher.id, teacher.name)}
                    >
                      Удалить
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Modal Add/Edit */}
      {isOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={1000}
          bg="rgba(0, 24, 51, 0.75)"
          backdropFilter="blur(6px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={closeModal}
        >
          <Box
            bg="white"
            rounded="2xl"
            maxW="lg"
            w="full"
            p={6}
            boxShadow="0 25px 50px -12px rgba(0, 32, 69, 0.4)"
            position="relative"
            onClick={(e) => e.stopPropagation()}
            as="form"
            onSubmit={handleSubmit}
            maxH="90vh"
            overflowY="auto"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color="#002045">
                {editingTeacher ? "Редактировать данные преподавателя" : "Добавить нового преподавателя"}
              </Heading>
              <Button size="sm" variant="ghost" onClick={closeModal}>✕</Button>
            </Flex>

            <Flex direction="column" gap={4}>
              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  ФИО преподавателя <span style={{ color: "#E53E3E" }}>*</span>
                </Text>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Галина Алексеевна"
                />
              </Box>

              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Предмет / Дисциплина <span style={{ color: "#E53E3E" }}>*</span>
                </Text>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Математика и логика"
                />
              </Box>

              <Flex gap={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Кафедра
                  </Text>
                  <Select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Box w="120px">
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Порядок
                  </Text>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  />
                </Box>
              </Flex>

              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Должность / Звание
                </Text>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Учредитель и директор / Зав. кафедры"
                />
              </Box>

              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Фотография
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
                    <Box
                      as="img"
                      src={resolveImage(formData.imageUrl)}
                      alt="Preview"
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                  <Input
                    flex={1}
                    fontSize="xs"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/teachers/galina.jpg или /uploads/..."
                  />
                  <Button
                    size="sm"
                    colorScheme="gray"
                    isLoading={uploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Загрузить
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Flex>
              </Box>

              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  О преподавателе (достижения, опыт)
                </Text>
                <Textarea
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Опыт работы, участие в олимпиадах, методики преподавания..."
                />
              </Box>
            </Flex>

            <Flex justify="flex-end" gap={3} mt={6} pt={4} borderTop="1px solid" borderColor="gray.100">
              <Button variant="ghost" onClick={closeModal}>
                Отмена
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                bg="#002045"
                color="white"
                _hover={{ bg: "#003366" }}
                isLoading={isSubmitting}
              >
                {editingTeacher ? "Сохранить изменения" : "Добавить"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
      <AdminToast toastData={toastData} />
    </Box>
  );
}
