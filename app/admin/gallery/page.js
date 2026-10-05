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

const INITIAL_GALLERY = [
  {
    id: 1,
    title: "Инновационная лаборатория робототехники и IT",
    caption: "Рабочие места для программирования, тестирования роботов, пайки и 3D-печати.",
    type: "image",
    url: "/images/programs/high.jpg",
    category: "labs",
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: "Видео-тур по современному кампусу NGS",
    caption: "Атмосфера школы: просторные светлые коридоры, зоны отдыха и технологии.",
    type: "video",
    url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-students-studying-in-a-classroom-42654-large.mp4",
    category: "campus",
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: "Естественно-научная лаборатория биологии и химии",
    caption: "Оптические микроскопы, реактивы и практические эксперименты на каждом уроке.",
    type: "image",
    url: "/images/programs/middle.jpg",
    category: "labs",
    featured: false,
    order: 3,
  },
  {
    id: 4,
    title: "Интерактивные классы начальной школы",
    caption: "Эргономичная мебель, смарт-экраны и комфорт для учеников 1-4 классов.",
    type: "image",
    url: "/images/programs/primary.jpg",
    category: "classrooms",
    featured: false,
    order: 4,
  },
  {
    id: 5,
    title: "Пространство дошколят (Pre-school)",
    caption: "Уютный класс с материалами Монтессори, играми и мягким ковровым покрытием.",
    type: "image",
    url: "/images/programs/preschool.jpg",
    category: "classrooms",
    featured: false,
    order: 5,
  },
  {
    id: 6,
    title: "Практикум по программированию и алгоритмам",
    caption: "Старшеклассники разрабатывают проекты с использованием Python и машинного обучения.",
    type: "video",
    url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-typing-on-a-laptop-keyboard-41386-large.mp4",
    category: "labs",
    featured: false,
    order: 6,
  },
  {
    id: 7,
    title: "Главный кампус и прилегающая территория",
    caption: "Охраняемая благоустроенная зеленая зона отдыха в экологически чистом районе.",
    type: "image",
    url: "/uploads/bg.png",
    category: "campus",
    featured: true,
    order: 7,
  },
  {
    id: 8,
    title: "Спортивный комплекс и открытые площадки",
    caption: "Крытый универсальный спортзал, профессиональное покрытие, футбольное поле.",
    type: "image",
    url: "/uploads/bg.png",
    category: "sports",
    featured: false,
    order: 8,
  },
  {
    id: 9,
    title: "Школьные проекты и научные презентации",
    caption: "Защита стартапов и докладов на школьной научной ярмарке.",
    type: "image",
    url: "/images/programs/middle.jpg",
    category: "events",
    featured: false,
    order: 9,
  },
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

  const getSavedGallery = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ngs_custom_gallery");
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    return INITIAL_GALLERY;
  };

  const persistLocalGallery = (list) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("ngs_custom_gallery", JSON.stringify(list));
      } catch (e) {}
    }
  };

  const fetchGallery = async () => {
    try {
      setIsLoading(true);
      const res = await galleryService.getAllAdmin();
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        setItems(res.data);
        persistLocalGallery(res.data);
        return;
      }
    } catch (error) {
      console.warn("Backend gallery endpoint offline/404, using cached/fallback gallery.");
    } finally {
      setIsLoading(false);
    }

    const localList = getSavedGallery();
    setItems(localList);
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
        setFormData((prev) => ({
          ...prev,
          url: res.data.url,
          type: file.type.startsWith("video/") ? "video" : "image",
        }));
        toast({
          title: "Медиафайл загружен",
          status: "success",
          duration: 2000,
        });
      }
    } catch (err) {
      // FileReader fallback for preview & persistence
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            url: event.target.result,
            type: file.type.startsWith("video/") ? "video" : "image",
          }));
          toast({
            title: "Файл добавлен",
            status: "success",
            duration: 2000,
          });
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      toast({
        title: "Укажите медиафайл",
        description: "URL или загрузка файла обязательны",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      let updatedList = [...items];

      if (editingItem) {
        try {
          await galleryService.updateItem(editingItem.id, formData);
        } catch (err) {
          console.warn("Backend gallery update skipped/failed, updating client state.");
        }
        updatedList = updatedList.map((i) =>
          i.id === editingItem.id ? { ...i, ...formData } : i
        );
        toast({
          title: "Элемент обновлен",
          status: "success",
          duration: 2000,
        });
      } else {
        const newId = Date.now();
        const newItem = { id: newId, ...formData };
        try {
          const res = await galleryService.createItem(formData);
          if (res?.data?.id) newItem.id = res.data.id;
        } catch (err) {
          console.warn("Backend gallery create skipped/failed, updating client state.");
        }
        updatedList.push(newItem);
        toast({
          title: "Элемент добавлен в галерею",
          status: "success",
          duration: 2000,
        });
      }

      setItems(updatedList);
      persistLocalGallery(updatedList);
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

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Вы уверены, что хотите удалить "${title || "элемент"}" из галереи?`)) return;

    try {
      try {
        await galleryService.deleteItem(id);
      } catch (err) {}
      const updatedList = items.filter((i) => i.id !== id);
      setItems(updatedList);
      persistLocalGallery(updatedList);
      toast({
        title: "Элемент удален",
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

  const resolveMedia = (url) => {
    if (!url) return "/images/programs/high.jpg";
    if (url.startsWith("/images/") || url.startsWith("data:") || url.startsWith("http")) return url;
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
    : items.filter((i) => i.category === selectedCategory);

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <Heading size="lg" color="#002045">Галерея кампуса и жизни школы</Heading>
          <Text color="gray.600" fontSize="sm" mt={1}>
            Управление фото- и видеоматериалами современной среды школы
          </Text>
        </Box>
        <Button
          bg="#002045"
          color="white"
          _hover={{ bg: "#003366" }}
          onClick={() => openModal()}
        >
          <HStack spacing={2}>
            <span className="material-symbols-outlined">add_photo_alternate</span>
            <Text>Добавить в галерею</Text>
          </HStack>
        </Button>
      </Flex>

      {/* Category Filter Tabs */}
      <HStack spacing={2} mb={6} overflowX="auto" pb={2}>
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            size="sm"
            rounded="xl"
            variant={selectedCategory === cat.id ? "solid" : "outline"}
            bg={selectedCategory === cat.id ? "#002045" : "transparent"}
            color={selectedCategory === cat.id ? "white" : "gray.600"}
            borderColor={selectedCategory === cat.id ? "#002045" : "gray.200"}
            _hover={{ bg: selectedCategory === cat.id ? "#001835" : "gray.50" }}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </Button>
        ))}
      </HStack>

      {isLoading ? (
        <Flex justify="center" align="center" minH="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : filteredItems.length === 0 ? (
        <Box textAlign="center" py={12} bg="white" rounded="2xl" border="1px dashed" borderColor="gray.200">
          <Text color="gray.500" mb={4}>В этой категории пока нет материалов</Text>
          <Button size="sm" onClick={() => openModal()}>Добавить первый объект</Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredItems.map((item) => (
            <Box
              key={item.id}
              bg="white"
              rounded="2xl"
              border="1px solid"
              borderColor="gray.100"
              overflow="hidden"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              transition="all 0.2s"
              display="flex"
              flexDirection="column"
            >
              {/* Media Preview Box */}
              <Box position="relative" h="200px" bg="black" overflow="hidden">
                {item.type === "video" ? (
                  <video
                    src={resolveMedia(item.url)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src={resolveMedia(item.url)}
                    alt={item.title || "Галерея"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/programs/high.jpg";
                    }}
                  />
                )}

                <Box position="absolute" top={3} left={3} display="flex" gap={1.5}>
                  <Badge bg="rgba(0,0,0,0.6)" color="white" px={2} py={0.5} rounded="md" fontSize="xs">
                    {item.type === "video" ? "🎬 Видео" : "📷 Фото"}
                  </Badge>
                  {item.featured && (
                    <Badge bg="yellow.400" color="black" px={2} py={0.5} rounded="md" fontSize="xs">
                      ★ Главная
                    </Badge>
                  )}
                </Box>

                <Box
                  position="absolute"
                  top={3}
                  right={3}
                  bg="white"
                  px={2}
                  py={0.5}
                  rounded="md"
                  fontSize="xs"
                  fontWeight="bold"
                  color="#002045"
                >
                  #{item.order || 0}
                </Box>
              </Box>

              <Box p={5} flex={1} display="flex" flexDirection="column">
                <Badge
                  alignSelf="flex-start"
                  mb={2}
                  bg="purple.50"
                  color="purple.700"
                  fontSize="xs"
                  px={2}
                  py={0.5}
                  rounded="md"
                >
                  {CATEGORIES.find((c) => c.id === item.category)?.label || item.category}
                </Badge>

                <Heading size="sm" color="#002045" mb={1} lineHeight="1.3">
                  {item.title || "Без названия"}
                </Heading>

                <Text fontSize="xs" color="gray.600" noOfLines={2} mb={4} flex={1}>
                  {item.caption || "Описание отсутствует"}
                </Text>

                <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="gray.100">
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => openModal(item)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="red.500"
                    _hover={{ bg: "red.50" }}
                    onClick={() => handleDelete(item.id, item.title)}
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
                {editingItem ? "Редактировать объект галереи" : "Добавить объект в галерею"}
              </Heading>
              <Button size="sm" variant="ghost" onClick={closeModal}>✕</Button>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Заголовок / Название
                </Text>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="STEM лаборатория и робототехника"
                />
              </Box>

              <Flex gap={4} mb={4}>
                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Тип контента
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
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="image">Фотография</option>
                    <option value="video">Видео (автовоспроизведение)</option>
                  </select>
                </Box>

                <Box flex={1}>
                  <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                    Категория
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
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </Box>
              </Flex>

              <Box mb={4}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Ссылка на медиафайл или загрузка *
                </Text>
                <Flex gap={2} mb={2}>
                  <Input
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="/images/... или https://..."
                    size="sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    isLoading={uploadingMedia}
                  >
                    Загрузить
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                </Flex>

                <Text fontSize="xs" color="gray.500" mb={1}>
                  Быстрый выбор пресетов:
                </Text>
                <HStack spacing={2} wrap="wrap">
                  {[
                    { label: "Робототехника", url: "/images/programs/high.jpg", type: "image" },
                    { label: "Естественные науки", url: "/images/programs/middle.jpg", type: "image" },
                    { label: "Начальная школа", url: "/images/programs/primary.jpg", type: "image" },
                    { label: "Дошколята", url: "/images/programs/preschool.jpg", type: "image" },
                    { label: "Видео кампус", url: "https://assets.mixkit.co/videos/preview/mixkit-group-of-students-studying-in-a-classroom-42654-large.mp4", type: "video" },
                  ].map((preset) => (
                    <Button
                      key={preset.url}
                      size="xs"
                      variant="ghost"
                      bg="gray.100"
                      _hover={{ bg: "gray.200" }}
                      onClick={() => setFormData({ ...formData, url: preset.url, type: preset.type })}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </HStack>
              </Box>

              <Flex gap={4} mb={4}>
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

                <Flex align="center" pt={6} gap={2}>
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <Text as="label" htmlFor="featured-check" fontSize="sm" fontWeight="semibold" color="#002045" cursor="pointer">
                    Выводить в топ (Featured)
                  </Text>
                </Flex>
              </Flex>

              <Box mb={6}>
                <Text as="label" display="block" fontSize="sm" fontWeight="semibold" mb={1.5} color="#002045">
                  Подпись / Описание
                </Text>
                <Textarea
                  rows={3}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Краткое описание оборудования или зоны кампуса..."
                />
              </Box>

              <Flex justify="flex-end" gap={3}>
                <Button variant="ghost" onClick={closeModal}>Отмена</Button>
                <Button
                  type="submit"
                  bg="#002045"
                  color="white"
                  _hover={{ bg: "#003366" }}
                  isLoading={isSubmitting}
                >
                  {editingItem ? "Сохранить изменения" : "Добавить"}
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
