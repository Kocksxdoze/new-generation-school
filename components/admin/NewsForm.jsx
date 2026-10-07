"use client";

import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Flex,
  Text,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { newsService, mediaService } from "@/utils/api";
import AdminToast, { useAdminToast } from "@/components/admin/AdminToast";

const PRESET_CATEGORIES = [
  "Новость",
  "Мероприятие",
  "Олимпиада",
  "Достижения",
  "Поездка",
  "Анонс",
];

function transliterate(str) {
  const ru = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return str
    .toLowerCase()
    .split("")
    .map((char) => ru[char] !== undefined ? ru[char] : char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewsForm({ initialData = null }) {
  const router = useRouter();
  const { toast, toastData } = useAdminToast();
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    body: initialData?.body || "",
    category: initialData?.category || "Новость",
    date: initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    externalUrl: initialData?.externalUrl || "",
    coverImage: initialData?.coverImage || "",
    published: initialData ? initialData.published : true,
  });

  const [customCategory, setCustomCategory] = useState(
    initialData && !PRESET_CATEGORIES.includes(initialData.category)
      ? initialData.category
      : ""
  );

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: initialData ? prev.slug : transliterate(val),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await mediaService.uploadMedia(file);
      if (res?.data?.url) {
        setFormData((prev) => ({ ...prev, coverImage: res.data.url }));
        toast({
          title: "Обложка загружена",
          status: "success",
          duration: 2000,
        });
      }
    } catch (err) {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение",
        status: "error",
        duration: 3000,
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: "Укажите заголовок", status: "warning", duration: 2500 });
      return;
    }
    if (!formData.body.trim()) {
      toast({ title: "Укажите текст публикации", status: "warning", duration: 2500 });
      return;
    }

    setIsLoading(true);
    try {
      const activeCategory = customCategory.trim() || formData.category;
      
      let parsedDate = new Date();
      if (formData.date) {
        const rawDate = String(formData.date).trim();
        if (/^\d{2}\.\d{2}\.\d{4}$/.test(rawDate)) {
          const [d, m, y] = rawDate.split('.');
          parsedDate = new Date(`${y}-${m}-${d}T12:00:00Z`);
        } else {
          const d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            parsedDate = d;
          }
        }
      }
      const finalIsoDate = !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : new Date().toISOString();

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim() || transliterate(formData.title) || `news-${Date.now()}`,
        excerpt: formData.excerpt.trim() || formData.body.slice(0, 180),
        body: formData.body.trim(),
        category: activeCategory,
        date: finalIsoDate,
        externalUrl: formData.externalUrl.trim() || null,
        coverImage: formData.coverImage.trim() || null,
        published: Boolean(formData.published),
      };

      if (initialData?.id) {
        await newsService.updateNews(initialData.id, payload);
        toast({ title: "Новость успешно обновлена", status: "success", duration: 2500 });
      } else {
        await newsService.createNews(payload);
        toast({ title: "Новость успешно создана", status: "success", duration: 2500 });
      }
      router.push("/admin/news");
      router.refresh();
    } catch (error) {
      let desc = error.response?.data?.message || "Проверьте введенные данные";
      if (error.response?.data?.details) {
        const details = error.response.data.details;
        const errStrings = Object.entries(details).map(([field, errList]) => {
          const msg = Array.isArray(errList) ? errList.join(", ") : String(errList);
          return `${field}: ${msg}`;
        });
        if (errStrings.length > 0) {
          desc = `${desc} (${errStrings.join("; ")})`;
        }
      }
      toast({
        title: "Ошибка сохранения",
        description: desc,
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resolveImage = (url) => {
    if (!url) return null;
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
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      maxW="4xl"
    >
      <VStack spacing={5} align="stretch">
        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="bold" color="#002045" mb={1.5}>
            Заголовок новости <span style={{ color: "#E53E3E" }}>*</span>
          </Text>
          <Input
            required
            size="lg"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Победа учеников NGS на Международной Олимпиаде..."
            fontWeight="semibold"
          />
        </Box>

        <Flex gap={4} direction={{ base: "column", sm: "row" }}>
          <Box flex={1}>
            <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
              URL-ссылка (slug)
            </Text>
            <Input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="pobeda-na-mezhdunarodnoy-olimpiade"
            />
          </Box>

          <Box w={{ base: "full", sm: "200px" }}>
            <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
              Дата публикации <span style={{ color: "#E53E3E" }}>*</span>
            </Text>
            <Input
              required
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </Box>
        </Flex>

        <Flex gap={4} direction={{ base: "column", sm: "row" }}>
          <Box flex={1}>
            <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
              Категория <span style={{ color: "#E53E3E" }}>*</span>
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
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
                if (e.target.value !== "Другое") setCustomCategory("");
              }}
            >
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="Другое">Другое (ввести вручную)</option>
            </select>
          </Box>

          {formData.category === "Другое" && (
            <Box flex={1}>
              <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
                Своя категория <span style={{ color: "#E53E3E" }}>*</span>
              </Text>
              <Input
                required
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Спецпроект, Интервью..."
              />
            </Box>
          )}
        </Flex>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
            Обложка (фото)
          </Text>
          <Flex gap={3} align="center">
            {formData.coverImage && (
              <Box
                w="64px"
                h="48px"
                rounded="md"
                overflow="hidden"
                bg="gray.100"
                flexShrink={0}
                border="1px solid"
                borderColor="gray.200"
              >
                <Box
                  as="img"
                  src={resolveImage(formData.coverImage)}
                  alt="Cover"
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            )}
            <Input
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="/uploads/... или URL ссылки"
              fontSize="xs"
            />
            <Button
              colorScheme="gray"
              isLoading={uploadingImage}
              onClick={() => fileInputRef.current?.click()}
              flexShrink={0}
            >
              Загрузить фото
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
          <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
            Краткий анонс (отображается в карточках на главной)
          </Text>
          <Textarea
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Краткое содержание новости (1-2 предложения)..."
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
            Полный текст публикации <span style={{ color: "#E53E3E" }}>*</span>
          </Text>
          <Textarea
            rows={8}
            required
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            placeholder="Подробный текст статьи, новости или отчета о мероприятии..."
          />
        </Box>

        <Box>
          <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="#002045" mb={1.5}>
            Внешняя ссылка (например, ссылка на Instagram или пост)
          </Text>
          <Input
            value={formData.externalUrl}
            onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
            placeholder="https://instagram.com/p/..."
          />
        </Box>

        <Flex align="center" gap={3} pt={2}>
          <input
            type="checkbox"
            id="published-checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            style={{ width: "20px", height: "20px", cursor: "pointer", accentColor: "#002045" }}
          />
          <Text as="label" htmlFor="published-checkbox" fontSize="sm" fontWeight="semibold" color="#002045" cursor="pointer">
            Опубликовать сразу на сайте
          </Text>
        </Flex>

        <HStack spacing={4} pt={4}>
          <Button
            type="submit"
            colorScheme="blue"
            bg="#002045"
            color="white"
            _hover={{ bg: "#003366" }}
            isLoading={isLoading}
            size="lg"
            px={8}
          >
            {initialData?.id ? "Сохранить изменения" : "Опубликовать новость"}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => router.push("/admin/news")}
          >
            Отмена
          </Button>
        </HStack>
      </VStack>
      <AdminToast toastData={toastData} />
    </Box>
  );
}
