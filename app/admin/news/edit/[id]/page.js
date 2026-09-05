"use client";

import { Box, Heading, Button, Spinner, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import NewsForm from '@/components/admin/NewsForm';
import { newsService } from '@/utils/api';
import { use } from 'react';

export default function EditNewsPage({ params }) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const res = await newsService.getAllNews(); // or a specific endpoint if exists. 
        // We will filter from all news since admin endpoint returns all.
        const item = res.data?.find(n => n.id === parseInt(id));
        if (item) {
          setInitialData(item);
        } else {
          throw new Error('Not found');
        }
      } catch (error) {
        alert('Ошибка загрузки');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) fetchNewsItem();
  }, [id]);

  if (isLoading) {
    return <Flex justify="center" p={10}><Spinner size="xl" /></Flex>;
  }

  if (!initialData) {
    return <Box p={6}>Новость не найдена.</Box>;
  }

  return (
    <Box>
      <Box mb={6} display="flex" alignItems="center" gap={4}>
        <Link href="/admin/news" passHref legacyBehavior>
          <Button as="a" variant="ghost">← Назад</Button>
        </Link>
        <Heading size="md">Редактирование новости: {initialData.title}</Heading>
      </Box>
      <NewsForm initialData={initialData} />
    </Box>
  );
}
