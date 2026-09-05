"use client";

import { Box, Button, Flex, Heading, Text, VStack, IconButton, Spinner, Textarea, Badge } from '@chakra-ui/react';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { pagesService } from '@/utils/api';
import SectionFormBuilder from '@/components/admin/SectionFormBuilder';

const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;
const UpIcon = () => <span>⬆️</span>;
const DownIcon = () => <span>⬇️</span>;

export default function EditPageSections({ params }) {
  const { id } = use(params);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({ type: 'hero', data: '{}', visible: true });

  const fetchPage = async () => {
    try {
      setIsLoading(true);
      const res = await pagesService.getAllPages();
      const p = res.data?.find(x => x.id === parseInt(id));
      if (p) {
        // Sort sections by order
        p.sections?.sort((a, b) => a.order - b.order);
        setPage(p);
      } else {
        throw new Error('Not found');
      }
    } catch (error) {
      alert('Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPage();
  }, [id]);

  const handleSaveSection = async () => {
    try {
      if (editingSection) {
        await pagesService.updateSection(id, editingSection.id, formData);
        alert('Секция обновлена');
      } else {
        await pagesService.createSection(id, formData);
        alert('Секция добавлена');
      }
      setEditingSection(null);
      setFormData({ type: 'hero', data: '{}', visible: true });
      fetchPage();
    } catch (error) {
      alert(error.response?.data?.error || 'Ошибка сохранения');
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm('Удалить эту секцию?')) return;
    try {
      await pagesService.deleteSection(id, sectionId);
      alert('Секция удалена');
      fetchPage();
    } catch (error) {
      alert('Ошибка');
    }
  };

  const handleReorder = async (currentIndex, direction) => {
    if (!page.sections) return;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= page.sections.length) return;

    const newSections = [...page.sections];
    // Swap
    const temp = newSections[currentIndex];
    newSections[currentIndex] = newSections[newIndex];
    newSections[newIndex] = temp;

    const orderIds = newSections.map(s => s.id);
    try {
      await pagesService.reorderSections(id, orderIds);
      fetchPage();
    } catch (error) {
      alert('Ошибка сортировки');
    }
  };

  const openEditor = (section = null) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        type: section.type,
        data: section.data,
        visible: section.visible,
      });
    } else {
      setEditingSection(null);
      setFormData({ type: 'hero', data: '{\n  "title": "",\n  "subtitle": ""\n}', visible: true });
    }
  };

  if (isLoading) return <Flex justify="center" p={10}><Spinner size="xl" /></Flex>;
  if (!page) return <Box p={6}>Страница не найдена</Box>;

  return (
    <Flex gap={6} direction={{ base: 'column', lg: 'row' }}>
      {/* Left side: List of sections */}
      <Box flex={1} bg="white" p={6} borderRadius="md" shadow="sm">
        <Box mb={6} display="flex" alignItems="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Button as={Link} href="/admin/pages" variant="ghost" size="sm">← Назад</Button>
            <Heading size="md">Секции: {page.title}</Heading>
          </Flex>
          <Button colorScheme="blue" size="sm" onClick={() => openEditor()}>
            + Добавить секцию
          </Button>
        </Box>

        <VStack align="stretch" spacing={3}>
          {page.sections?.map((section, index) => (
            <Flex key={section.id} p={3} borderWidth="1px" borderRadius="md" justify="space-between" align="center" bg="gray.50">
              <Box>
                <Text fontWeight="bold">{section.type}</Text>
                <Badge colorScheme={section.visible ? 'green' : 'gray'} mt={1}>
                  {section.visible ? 'Видна' : 'Скрыта'}
                </Badge>
              </Box>
              <Flex gap={2}>
                <IconButton size="xs" icon={<UpIcon />} isDisabled={index === 0} onClick={() => handleReorder(index, 'up')} />
                <IconButton size="xs" icon={<DownIcon />} isDisabled={index === page.sections.length - 1} onClick={() => handleReorder(index, 'down')} />
                <IconButton size="xs" icon={<EditIcon />} colorScheme="blue" onClick={() => openEditor(section)} />
                <IconButton size="xs" icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDeleteSection(section.id)} />
              </Flex>
            </Flex>
          ))}
          {(!page.sections || page.sections.length === 0) && (
            <Text color="gray.500" textAlign="center" py={4}>Нет секций на этой странице</Text>
          )}
        </VStack>
      </Box>

      {/* Right side: Editor */}
      <Box flex={1} bg="white" p={6} borderRadius="md" shadow="sm">
        <Heading size="sm" mb={4}>
          {editingSection ? `Редактирование секции: ${editingSection.type}` : 'Новая секция'}
        </Heading>
        
        <VStack align="stretch" spacing={4}>
          <Box>
            <Text as="label" display="block" mb={2} fontWeight="medium">Тип компонента (type)</Text>
            <Box 
              as="select"
              value={formData.type} 
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              w="100%"
            >
              <option value="hero">Hero</option>
              <option value="features">Features</option>
              <option value="programs">Programs</option>
              <option value="tech_results">Tech & Results</option>
              <option value="teachers">Teachers</option>
              <option value="alumni">Alumni</option>
              <option value="testimonials">Testimonials</option>
              <option value="news">News & Map</option>
              <option value="location">LocationMap (Yandex)</option>
            </Box>
          </Box>

          <Box>
            <Text as="label" display="block" mb={2} fontWeight="medium">Содержимое</Text>
            <SectionFormBuilder 
              type={formData.type}
              dataStr={formData.data}
              onChange={(newData) => setFormData({...formData, data: newData})}
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Text as="label" mb="0" mr={3} fontWeight="medium">Отображать на сайте</Text>
            <input 
              type="checkbox" 
              checked={formData.visible} 
              onChange={(e) => setFormData({...formData, visible: e.target.checked})} 
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </Box>

          <Button colorScheme="blue" onClick={handleSaveSection}>
            {editingSection ? 'Сохранить изменения' : 'Добавить секцию'}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
