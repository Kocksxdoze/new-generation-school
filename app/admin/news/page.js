"use client";

import { Box, Button, Flex, Heading, Spinner, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { newsService } from '@/utils/api';

export default function AdminNewsList() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const res = await newsService.getAllNews();
      setNews(res.data || []);
    } catch (error) {
      alert('Не удалось загрузить новости');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту новость?')) return;
    
    try {
      await newsService.deleteNews(id);
      alert('Новость удалена');
      fetchNews();
    } catch (error) {
      alert('Ошибка удаления');
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" shadow="sm">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Управление новостями</Heading>
        <Link href="/admin/news/create" passHref legacyBehavior>
          <Button as="a" colorScheme="blue">Добавить новость</Button>
        </Link>
      </Flex>

      {isLoading ? (
        <Flex justify="center" p={10}><Spinner size="xl" /></Flex>
      ) : (
        <Box overflowX="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Заголовок</th>
                <th style={{ padding: '12px' }}>Категория</th>
                <th style={{ padding: '12px' }}>Дата</th>
                <th style={{ padding: '12px' }}>Статус</th>
                <th style={{ padding: '12px' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={{ padding: '12px' }}>{item.id}</td>
                  <td style={{ padding: '12px' }}>{item.title}</td>
                  <td style={{ padding: '12px' }}>{item.category}</td>
                  <td style={{ padding: '12px' }}>{new Date(item.date).toLocaleDateString('ru-RU')}</td>
                  <td style={{ padding: '12px' }}>
                    <Badge colorScheme={item.published ? 'green' : 'gray'}>
                      {item.published ? 'Опубликовано' : 'Черновик'}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Button as={Link} href={`/admin/news/edit/${item.id}`} size="sm" colorScheme="blue" mr={2}>Изменить</Button>
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      onClick={() => handleDelete(item.id)} 
                    >Удалить</Button>
                  </td>
                </tr>
              ))}
              {news.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '12px', textAlign: 'center' }}>Нет новостей</td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
}
