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
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { galleryService, mediaService } from "@/utils/api";
import AdminToast, { useAdminToast } from "@/components/admin/AdminToast";

const CATEGORIES = [
  { id: "all", label: "Все категории" },
  { id: "campus", label: "Кампус и архитектура" },
  { id: "labs", label: "Лаборатории и IT" },
  { id: "classrooms", label: "Классы и аудитории" },
  { id: "sports", label: "Спорт и здоровье" },
  { id: "events", label: "Жизнь школы и события" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const fileInputRef = useRef(null);
  const { toast, toastData } = useAdminToast();

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    type: "image",
    url: "",
    thumbnailUrl: "",
    category: "campus",
    featured: false,
    order: 0,
  });

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const res = await galleryService.getAllAdmin();
      setItems(res.data || []);
    } catch (error) {
      toast({
        title: "Ошибка загрузки галереи",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || "",
        caption: item.caption || "",
        type: item.type || "image",
        url: item.url || "",
        thumbnailUrl: item.thumbnailUrl || "",
        category: item.category || "campus",
        featured: Boolean(item.featured),
        order: item.order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        caption: "",
        type: "image",
        url: "",
        thumbnailUrl: "",
        category: "campus",
        featured: false,
        order: items.length + 1,
      });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingMedia(true);
      const res = await mediaService.uploadMedia(file);
      if (res?.data?.url) {
        const isVideo = file.type.startsWith("video/");
        setFormData((prev) => ({
          ...prev,
          url: res.data.url,
          type: isVideo ? "video" : prev.type,
        }));
        toast({
          title: "Медиафайл загружен",
          status: "success",
          duration: 2000,
        });
      }
    } catch (err) {
      toast({
        title: "Ошибка загрузки файла",
        status: "error",
        duration: 3000,
      });
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      toast({
        title: "Укажите ссылку или загрузите файл",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingItem) {
        await galleryService.updateItem(editingItem.id, formData);
        toast({
          title: "Медиаобъект обновлен",
          status: "success",
          duration: 2000,
        });
      } else {
        await galleryService.createItem(formData);
        toast({
          title: "Медиаобъект добавлен",
          status: "success",
          duration: 2000,
        });
      }
      closeModal();
      fetchGallery();
    } catch (error) {
      toast({
        title: "Ошибка сохранения",
        description: error.response?.data?.message || "Не удалось сохранить",
        status: "error",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Удалить медиафайл "${title || id}"?`)) return;

    try {
      await galleryService.deleteItem(id);
      toast({
        title: "Удалено",
        status: "info",
        duration: 2000,
      });
      fetchGallery();
    } catch (error) {
      toast({
        title: "Ошибка удаления",
        status: "error",
        duration: 3000,
      });
    }
  };

  const resolveUrl = (url) => {
    if (!url) return "/images/programs/preschool.jpg";
    if (url.startsWith("/images/")) return url;
    if (url.startsWith("/")) {
      const base = process.env.NEXT_PUBLIC_API_URL
        ? process.env.NEXT_PUBLIC_API_URL.replace("/api", "")
        : "https://new-generation-school.onrender.com";
      return `${base}${url}`;
    }
    return url;
  };

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((it) => it.category === selectedCategory);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <Heading size="lg" color="#002045">Галерея школьного кампуса</Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            Управление фото, видео-экскурсиями и слайдами современной среды
          </Text>
        </Box>
        <Button
          colorScheme="blue"
          bg="#002045"
          color="white"
          _hover={{ bg: "#003366" }}
          leftIcon={<span className="material-symbols-outlined">add_photo_alternate</span>}
          onClick={() => openModal()}
        >
          Добавить фото / видео
        </Button>
      </Flex>

      {/* Category Filter Tabs */}
      <Flex gap={2} mb={6} overflowX="auto" pb={2}>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            variant={selectedCategory === cat.id ? "solid" : "outline"}
            colorScheme={selectedCategory === cat.id ? "blue" : "gray"}
            bg={selectedCategory === cat.id ? "#002045" : "white"}
            color={selectedCategory === cat.id ? "white" : "gray.700"}
            onClick={() => setSelectedCategory(cat.id)}
            rounded="full"
          >
            {cat.label}
          </Button>
        ))}
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {filteredItems.map((item) => (
            <Box
              key={item.id}
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
              <Box position="relative" h="220px" bg="black" overflow="hidden">
                {item.type === "video" ? (
                  <video
                    src={resolveUrl(item.url)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    as="img"
                    src={resolveUrl(item.url)}
                    alt={item.title || "Фото школы"}
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                )}

                <Badge
                  position="absolute"
                  top={3}
                  left={3}
                  px={2.5}
                  py={1}
                  rounded="full"
                  colorScheme={item.type === "video" ? "red" : "blue"}
                  fontSize="2xs"
                  textTransform="uppercase"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    {item.type === "video" ? "videocam" : "photo_camera"}
                  </span>
                  {item.type === "video" ? "Видео" : "Фото"}
                </Badge>

                {item.featured && (
                  <Badge
                    position="absolute"
                    top={3}
                    right={3}
                    px={2.5}
                    py={1}
                    rounded="full"
                    bg="#FFB800"
                    color="#002045"
                    fontSize="2xs"
                    fontWeight="bold"
                  >
                    ★ Избранное
                  </Badge>
                )}
              </Box>

              <Box p={5} flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box mb={3}>
                  <Text fontSize="xs" fontWeight="bold" color="#FFB800" textTransform="uppercase" mb={1}>
                    {CATEGORIES.find((c) => c.id === item.category)?.label || item.category}
                  </Text>
                  <Heading as="h4" size="sm" color="#002045" mb={1}>
                    {item.title || "Без названия"}
                  </Heading>
                  {item.caption && (
                    <Text fontSize="xs" color="gray.500" noOfLines={2}>
                      {item.caption}
                    </Text>
                  )}
                </Box>

                <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="gray.100">
                  <Text fontSize="2xs" color="gray.400">
                    Порядок: {item.order}
                  </Text>
                  <HStack spacing={2}>
                    <Button
                      size="xs"
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => openModal(item)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDelete(item.id, item.title)}
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
                {editingItem ? "Редактировать медиафайл" : "Добавить фото или видео"}
              </Heading>
              <Button size="sm" variant="ghost" onClick={closeModal}>✕</Button>
            </Flex>

            <Flex direction="column" gap={4}>
              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Название / Заголовок
                </Text>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="STEM лаборатория и робототехника"
                />
              </Box>

              <Flex gap={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Тип контента
                  </Text>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="image">Фотография</option>
                    <option value="video">Видео (автовоспроизведение)</option>
                  </Select>
                </Box>

                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Категория
                  </Text>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Flex>

              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Ссылка на файл или загрузка <span style={{ color: "#E53E3E" }}>*</span>
                </Text>
                <Flex gap={2}>
                  <Input
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="/uploads/... или https://..."
                  />
                  <Button
                    size="md"
                    isLoading={uploadingMedia}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Загрузить
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                  />
                </Flex>
              </Box>

              <Box>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Краткое описание / Подпись
                </Text>
                <Textarea
                  rows={2}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Оборудование, формат занятий или описание площадки..."
                />
              </Box>

              <Flex justify="space-between" align="center" p={3} bg="gray.50" rounded="xl">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold">Показывать в избранном</Text>
                  <Text fontSize="xs" color="gray.500">Закреплен на первом экране галереи</Text>
                </Box>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#002045" }}
                />
              </Flex>
            </Flex>

            <Flex justify="flex-end" gap={3} mt={6}>
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
                {editingItem ? "Сохранить" : "Добавить"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
      <AdminToast toastData={toastData} />
    </Box>
  );
}
