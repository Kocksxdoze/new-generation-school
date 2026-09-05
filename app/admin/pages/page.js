"use client";

import { Box, Button, Flex, Heading, Spinner, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pagesService } from '@/utils/api';

export default function AdminPagesList() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageTitle, setNewPageTitle] = useState('');

  const fetchPages = async () => {
    try {
      setIsLoading(true);
      const res = await pagesService.getAllPages();
      setPages(res.data || []);
    } catch (error) {
      alert('Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreatePage = async () => {
    if (!newPageSlug || !newPageTitle) return;
    try {
      setIsCreating(true);
      await pagesService.createPage({ slug: newPageSlug, title: newPageTitle });
      alert('Страница создана');
      setNewPageSlug('');
      setNewPageTitle('');
      fetchPages();
    } catch (error) {
      alert(error.response?.data?.error || 'Ошибка создания');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить страницу? Это удалит все её секции.')) return;
    try {
      await pagesService.deletePage(id);
      alert('Страница удалена');
      fetchPages();
    } catch (error) {
      alert('Ошибка удаления');
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="md" shadow="sm">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Управление страницами</Heading>
      </Flex>

      <Flex mb={6} gap={4} maxW="2xl" align="flex-end">
        <Box flex={1}>
          <Text fontSize="sm" mb={1} color="gray.600">Название (для админки)</Text>
          <Input 
            value={newPageTitle} 
            onChange={(e) => setNewPageTitle(e.target.value)} 
            placeholder="Главная страница" 
          />
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" mb={1} color="gray.600">Slug (URL)</Text>
          <Input 
            value={newPageSlug} 
            onChange={(e) => setNewPageSlug(e.target.value)} 
            placeholder="home" 
          />
        </Box>
        <Button colorScheme="blue" onClick={handleCreatePage} isLoading={isCreating} isDisabled={!newPageSlug || !newPageTitle}>
          Добавить страницу
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justify="center" p={10}><Spinner size="xl" /></Flex>
      ) : (
        <Box overflowX="auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Название</th>
                <th style={{ padding: '12px' }}>Slug</th>
                <th style={{ padding: '12px' }}>Кол-во секций</th>
                <th style={{ padding: '12px' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={{ padding: '12px' }}>{item.id}</td>
                  <td style={{ padding: '12px' }}>{item.title}</td>
                  <td style={{ padding: '12px' }}>{item.slug}</td>
                  <td style={{ padding: '12px' }}>{item.sections?.length || 0}</td>
                  <td style={{ padding: '12px' }}>
                    <Button as={Link} href={`/admin/pages/${item.id}`} size="sm" colorScheme="blue" mr={2}>Секции</Button>
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      onClick={() => handleDelete(item.id)} 
                    >Удалить</Button>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '12px', textAlign: 'center' }}>Нет страниц</td>
                </tr>
              )}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  );
}
