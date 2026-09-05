"use client";

import { Box, Button, Flex, Heading, SimpleGrid, Image, Text, IconButton, Spinner, Input } from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { mediaService } from '@/utils/api';

const DeleteIcon = () => <span>🗑️</span>;
const CopyIcon = () => <span>📋</span>;

export default function AdminMediaList() {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      const res = await mediaService.getAllMedia();
      setMedia(res.data || []);
    } catch (error) {
      alert('Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await mediaService.uploadMedia(file);
      alert('Файл загружен');
      fetchMedia();
    } catch (error) {
      alert('Ошибка загрузки файла');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот файл?')) return;
    
    try {
      await mediaService.deleteMedia(id);
      alert('Файл удален');
      fetchMedia();
    } catch (error) {
      alert('Ошибка удаления');
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL скопирован: ' + url);
  };

  return (
    <Box bg="white" p={6} borderRadius="md" shadow="sm">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Медиабиблиотека</Heading>
        <Input 
          type="file" 
          ref={fileInputRef} 
          display="none" 
          onChange={handleFileChange} 
          accept="image/*"
        />
        <Button colorScheme="blue" onClick={handleUploadClick} isLoading={isUploading}>
          Загрузить файл
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justify="center" p={10}><Spinner size="xl" /></Flex>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 4, lg: 5 }} spacing={6}>
          {media.map((item) => {
            // Since we use http://localhost:4000/api as base, the images might be served from http://localhost:4000/uploads
            // Or the API URL env var. Let's assume URL includes the full path or we prepend the backend URL.
            // If item.url starts with /uploads, we need to prepend backend domain.
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://new-generation-school.onrender.com/api';
            const BASE_URL = API_URL.replace('/api', '');
            const fullUrl = item.url.startsWith('/') ? `${BASE_URL}${item.url}` : item.url;

            return (
              <Box key={item.id} borderWidth="1px" borderRadius="md" overflow="hidden" position="relative" group>
                <Box h="150px" bg="gray.100" display="flex" alignItems="center" justify="center">
                  <Image src={fullUrl} alt={item.alt || item.filename} objectFit="contain" w="full" h="full" />
                </Box>
                <Box p={2} bg="gray.50">
                  <Text fontSize="xs" isTruncated title={item.filename}>{item.filename}</Text>
                  <Text fontSize="xs" color="gray.500">{(item.size / 1024).toFixed(1)} KB</Text>
                </Box>
                
                <Flex position="absolute" top={2} right={2} gap={1} opacity={0.8} _hover={{ opacity: 1 }}>
                  <IconButton 
                    aria-label="Copy URL" 
                    icon={<CopyIcon />} 
                    size="xs" 
                    onClick={() => handleCopyUrl(item.url)}
                  />
                  <IconButton 
                    aria-label="Delete" 
                    icon={<DeleteIcon />} 
                    size="xs" 
                    colorScheme="red" 
                    onClick={() => handleDelete(item.id)}
                  />
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
      {!isLoading && media.length === 0 && (
        <Text textAlign="center" color="gray.500">Нет загруженных файлов</Text>
      )}
    </Box>
  );
}
