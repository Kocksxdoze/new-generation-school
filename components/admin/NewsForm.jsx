"use client";

import {
  Box,
  Button,
  Input,
  Textarea,
  Checkbox,
  VStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { newsService } from "@/utils/api";

export default function NewsForm({ initialData = null }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(), // backend expects DateTime
      };

      if (initialData?.id) {
        await newsService.updateNews(initialData.id, payload);
        alert("Новость обновлена");
      } else {
        await newsService.createNews(payload);
        alert("Новость создана");
      }
      router.push("/admin/news");
    } catch (error) {
      alert(error.response?.data?.error || "Произошла ошибка при сохранении");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="white"
      p={6}
      borderRadius="md"
      shadow="sm"
    >
      <VStack spacing={4} align="stretch">
        <Box>
          <Text as="label" display="block" mb={2} fontWeight="medium">
            Заголовок
          </Text>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>

        <Box>
          <Text as="label" display="block" mb={2} fontWeight="medium">
            Slug (URL)
          </Text>
          <Input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="my-new-post"
            required
          />
        </Box>

        <Flex gap={4}>
          <Box flex={1}>
            <Text as="label" display="block" mb={2} fontWeight="medium">
              Категория
            </Text>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Box>

          <Box flex={1}>
            <Text as="label" display="block" mb={2} fontWeight="medium">
              Дата
            </Text>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Box>
        </Flex>

        <Box>
          <Text as="label" display="block" mb={2} fontWeight="medium">
            Краткое описание
          </Text>
          <Textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
          />
        </Box>

        <Box>
          <Text as="label" display="block" mb={2} fontWeight="medium">
            Полный текст
          </Text>
          <Textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={10}
            required
          />
        </Box>

        <Box>
          <Text as="label" display="block" mb={2} fontWeight="medium">
            URL обложки (картинки)
          </Text>
          <Input
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="/uploads/..."
          />
        </Box>

        <Box>
          <Text as="label" display="block" mb={2} fontWeight="medium">
            Внешняя ссылка (опционально)
          </Text>
          <Input
            name="externalUrl"
            value={formData.externalUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </Box>

        <Box display="flex" alignItems="center">
          <Text
            as="label"
            htmlFor="published"
            mb="0"
            mr={3}
            fontWeight="medium"
          >
            Опубликовано
          </Text>
          <Checkbox
            id="published"
            name="published"
            isChecked={formData.published}
            onChange={handleChange}
          />
        </Box>

        <Flex justify="flex-end" pt={4} gap={4}>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/news")}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Сохранить
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
