"use client";

import { Box, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';
import NewsForm from '@/components/admin/NewsForm';

export default function CreateNewsPage() {
  return (
    <Box>
      <Box mb={6} display="flex" alignItems="center" gap={4}>
        <Link href="/admin/news" passHref legacyBehavior>
          <Button as="a" variant="ghost">← Назад</Button>
        </Link>
        <Heading size="md">Создание новости</Heading>
      </Box>
      <NewsForm />
    </Box>
  );
}
