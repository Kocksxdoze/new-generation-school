"use client";

import { Box, Button, Flex, Input, Textarea, Text, VStack, IconButton, HStack } from '@chakra-ui/react';

export default function SectionFormBuilder({ type, dataStr, onChange }) {
  let parsedData = {};
  try {
    parsedData = JSON.parse(dataStr || '{}');
  } catch (e) {
    parsedData = {};
  }

  const updateField = (field, value) => {
    const newData = { ...parsedData, [field]: value };
    onChange(JSON.stringify(newData, null, 2));
  };

  const updateArrayItem = (arrayField, index, itemField, value) => {
    const arr = [...(parsedData[arrayField] || [])];
    if (itemField === null) {
      arr[index] = value;
    } else {
      arr[index] = { ...arr[index], [itemField]: value };
    }
    updateField(arrayField, arr);
  };

  const addArrayItem = (arrayField, defaultItem) => {
    const arr = parsedData[arrayField] || [];
    updateField(arrayField, [...arr, defaultItem]);
  };

  const removeArrayItem = (arrayField, index) => {
    const arr = parsedData[arrayField] || [];
    updateField(arrayField, arr.filter((_, i) => i !== index));
  };

  // --- Hero Form ---
  if (type === 'hero') {
    const stats = parsedData.stats || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Текст над заголовком (Badge)</Text>
          <Input value={parsedData.badgeText || ''} onChange={(e) => updateField('badgeText', e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Заголовок (HTML разрешен)</Text>
          <Textarea value={parsedData.titleHtml || ''} onChange={(e) => updateField('titleHtml', e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Описание</Text>
          <Textarea value={parsedData.description || ''} onChange={(e) => updateField('description', e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>URL фото (справа)</Text>
          <Input value={parsedData.imageUrl || ''} onChange={(e) => updateField('imageUrl', e.target.value)} placeholder="/uploads/..." />
        </Box>
        
        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={3}>Статистика снизу (4 блока)</Text>
          <VStack spacing={4} align="stretch">
            {stats.map((stat, idx) => (
              <Box key={idx} p={3} borderWidth="1px" rounded="md" bg="gray.50">
                <Flex justify="space-between" mb={2}>
                   <Text fontWeight="bold" fontSize="sm">Стат {idx + 1}</Text>
                   <Button size="xs" colorScheme="red" onClick={() => removeArrayItem('stats', idx)}>Удалить</Button>
                </Flex>
                <HStack>
                  <Input size="sm" placeholder="Значение (15+)" value={stat.value || ''} onChange={(e) => updateArrayItem('stats', idx, 'value', e.target.value)} />
                  <Input size="sm" placeholder="Иконка (star)" value={stat.icon || ''} onChange={(e) => updateArrayItem('stats', idx, 'icon', e.target.value)} />
                </HStack>
                <Input mt={2} size="sm" placeholder="Текст (лет работы)" value={stat.label || ''} onChange={(e) => updateArrayItem('stats', idx, 'label', e.target.value)} />
              </Box>
            ))}
          </VStack>
          <Button mt={3} size="sm" onClick={() => addArrayItem('stats', { value: '', label: '', icon: '' })}>+ Добавить стат</Button>
        </Box>
      </VStack>
    );
  }

  // --- Features Form ---
  if (type === 'features') {
    const items = parsedData.items || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Надзаголовок</Text>
          <Input value={parsedData.subtitle || ''} onChange={(e) => updateField('subtitle', e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Заголовок</Text>
          <Input value={parsedData.title || ''} onChange={(e) => updateField('title', e.target.value)} />
        </Box>
        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={3}>Карточки преимуществ (нужно 4 шт)</Text>
          <VStack spacing={4} align="stretch">
            {items.map((item, idx) => (
              <Box key={idx} p={3} borderWidth="1px" rounded="md" bg="gray.50">
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize="sm">Карточка {idx + 1}</Text>
                  <Button size="xs" colorScheme="red" onClick={() => removeArrayItem('items', idx)}>Удалить</Button>
                </Flex>
                <Input mb={2} size="sm" placeholder="Иконка (Material Symbols)" value={item.icon || ''} onChange={(e) => updateArrayItem('items', idx, 'icon', e.target.value)} />
                <Input mb={2} size="sm" placeholder="Заголовок" value={item.title || ''} onChange={(e) => updateArrayItem('items', idx, 'title', e.target.value)} />
                <Textarea size="sm" placeholder="Текст" value={item.text || ''} onChange={(e) => updateArrayItem('items', idx, 'text', e.target.value)} />
              </Box>
            ))}
          </VStack>
          <Button mt={3} size="sm" onClick={() => addArrayItem('items', { title: '', text: '', icon: 'star' })}>+ Добавить карточку</Button>
        </Box>
      </VStack>
    );
  }

  // --- Programs Form ---
  if (type === 'programs') {
    const items = parsedData.items || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Заголовок</Text>
          <Input value={parsedData.title || ''} onChange={(e) => updateField('title', e.target.value)} />
        </Box>
        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={3}>Программы</Text>
          <VStack spacing={4} align="stretch">
            {items.map((item, idx) => (
              <Box key={idx} p={3} borderWidth="1px" rounded="md" bg="gray.50">
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize="sm">Программа {idx + 1}</Text>
                  <Button size="xs" colorScheme="red" onClick={() => removeArrayItem('items', idx)}>Удалить</Button>
                </Flex>
                <HStack mb={2}>
                  <Input size="sm" placeholder="Тег (01)" value={item.tag || ''} onChange={(e) => updateArrayItem('items', idx, 'tag', e.target.value)} />
                  <Input size="sm" placeholder="Возраст (1-4 классы)" value={item.age || ''} onChange={(e) => updateArrayItem('items', idx, 'age', e.target.value)} />
                </HStack>
                <Input mb={2} size="sm" placeholder="URL фото" value={item.imageUrl || ''} onChange={(e) => updateArrayItem('items', idx, 'imageUrl', e.target.value)} />
                <Input mb={2} size="sm" placeholder="Заголовок" value={item.title || ''} onChange={(e) => updateArrayItem('items', idx, 'title', e.target.value)} />
                <Textarea size="sm" placeholder="Текст" value={item.text || ''} onChange={(e) => updateArrayItem('items', idx, 'text', e.target.value)} />
              </Box>
            ))}
          </VStack>
          <Button mt={3} size="sm" onClick={() => addArrayItem('items', { tag: '', age: '', imageUrl: '', title: '', text: '' })}>+ Добавить программу</Button>
        </Box>
      </VStack>
    );
  }

  // --- TechResults Form ---
  if (type === 'tech_results') {
    const techItems = parsedData.techItems || [];
    const resultsItems = parsedData.resultsItems || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Box border="1px solid" borderColor="blue.200" p={4} rounded="md">
          <Text fontWeight="bold" color="blue.700" mb={3}>Левый блок (Технологии)</Text>
          <Input mb={2} placeholder="Заголовок" value={parsedData.techTitle || ''} onChange={(e) => updateField('techTitle', e.target.value)} />
          <Text fontWeight="bold" fontSize="sm" mt={4} mb={2}>Иконки (4 шт)</Text>
          {techItems.map((item, idx) => (
            <HStack key={idx} mb={2}>
              <Input size="sm" placeholder="Иконка" value={item.icon || ''} onChange={(e) => updateArrayItem('techItems', idx, 'icon', e.target.value)} />
              <Input size="sm" placeholder="Заголовок" value={item.title || ''} onChange={(e) => updateArrayItem('techItems', idx, 'title', e.target.value)} />
              <Input size="sm" placeholder="Текст" value={item.text || ''} onChange={(e) => updateArrayItem('techItems', idx, 'text', e.target.value)} />
            </HStack>
          ))}
          <Button mt={2} size="xs" onClick={() => addArrayItem('techItems', { icon: '', title: '', text: '' })}>+ Добавить</Button>
        </Box>

        <Box border="1px solid" borderColor="orange.200" p={4} rounded="md">
          <Text fontWeight="bold" color="orange.700" mb={3}>Правый блок (Результаты)</Text>
          <Input mb={2} placeholder="Заголовок" value={parsedData.resultsTitle || ''} onChange={(e) => updateField('resultsTitle', e.target.value)} />
          <Text fontWeight="bold" fontSize="sm" mt={4} mb={2}>Цифры (4 шт)</Text>
          {resultsItems.map((item, idx) => (
            <HStack key={idx} mb={2}>
              <Input size="sm" placeholder="Значение (100%)" value={item.value || ''} onChange={(e) => updateArrayItem('resultsItems', idx, 'value', e.target.value)} />
              <Input size="sm" placeholder="Подпись" value={item.label || ''} onChange={(e) => updateArrayItem('resultsItems', idx, 'label', e.target.value)} />
            </HStack>
          ))}
          <Button mt={2} size="xs" onClick={() => addArrayItem('resultsItems', { value: '', label: '' })}>+ Добавить</Button>
        </Box>
      </VStack>
    );
  }

  // --- Teachers Form ---
  if (type === 'teachers') {
    const items = parsedData.items || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Input placeholder="Заголовок" value={parsedData.title || ''} onChange={(e) => updateField('title', e.target.value)} />
        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <VStack spacing={4} align="stretch">
            {items.map((item, idx) => (
              <Box key={idx} p={3} borderWidth="1px" rounded="md" bg="gray.50">
                <Input mb={2} size="sm" placeholder="URL фото" value={item.imageUrl || ''} onChange={(e) => updateArrayItem('items', idx, 'imageUrl', e.target.value)} />
                <Input mb={2} size="sm" placeholder="ФИО" value={item.name || ''} onChange={(e) => updateArrayItem('items', idx, 'name', e.target.value)} />
                <Input mb={2} size="sm" placeholder="Предмет" value={item.subject || ''} onChange={(e) => updateArrayItem('items', idx, 'subject', e.target.value)} />
                <Input mb={2} size="sm" placeholder="Опыт" value={item.exp || ''} onChange={(e) => updateArrayItem('items', idx, 'exp', e.target.value)} />
                <Input size="sm" placeholder="Описание" value={item.desc || ''} onChange={(e) => updateArrayItem('items', idx, 'desc', e.target.value)} />
              </Box>
            ))}
          </VStack>
          <Button mt={3} size="sm" onClick={() => addArrayItem('items', { imageUrl: '', name: '', subject: '', exp: '', desc: '' })}>+ Добавить учителя</Button>
        </Box>
      </VStack>
    );
  }

  // --- Alumni Form ---
  if (type === 'alumni') {
    const logos = parsedData.logos || [];
    const reviews = parsedData.reviews || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Input placeholder="Заголовок" value={parsedData.title || ''} onChange={(e) => updateField('title', e.target.value)} />
        
        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={2}>Логотипы вузов (настройки)</Text>
          {logos.map((logo, idx) => (
            <Box key={idx} p={3} borderWidth="1px" rounded="md" mb={2} bg="gray.50">
              <Flex justify="space-between" mb={2}>
                 <Text fontWeight="bold" fontSize="sm">Вуз {idx + 1}</Text>
                 <Button size="xs" colorScheme="red" onClick={() => removeArrayItem('logos', idx)}>Удалить</Button>
              </Flex>
              <HStack mb={2}>
                <Input size="sm" placeholder="Название (WIUT)" value={logo.name || ''} onChange={(e) => updateArrayItem('logos', idx, 'name', e.target.value)} />
                <Input size="sm" placeholder="Город (Ташкент)" value={logo.city || ''} onChange={(e) => updateArrayItem('logos', idx, 'city', e.target.value)} />
              </HStack>
              <HStack mb={2}>
                <Input size="sm" placeholder="Цвет фона (blue.500)" value={logo.bg || ''} onChange={(e) => updateArrayItem('logos', idx, 'bg', e.target.value)} />
                <Input size="sm" placeholder="Тип (text/icon)" value={logo.type || ''} onChange={(e) => updateArrayItem('logos', idx, 'type', e.target.value)} />
              </HStack>
              <HStack>
                <Input size="sm" placeholder="Буква или иконка (W)" value={logo.label || ''} onChange={(e) => updateArrayItem('logos', idx, 'label', e.target.value)} />
              </HStack>
            </Box>
          ))}
          <Button mt={2} size="xs" onClick={() => addArrayItem('logos', { name: '', city: '', bg: 'blue.500', type: 'text', label: '', iconColor: 'white' })}>+ Добавить лого</Button>
        </Box>

        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={2}>Отзывы (2 шт)</Text>
          {reviews.map((review, idx) => (
            <Box key={idx} p={3} borderWidth="1px" rounded="md" mb={2}>
              <Input mb={2} size="sm" placeholder="Имя" value={review.name || ''} onChange={(e) => updateArrayItem('reviews', idx, 'name', e.target.value)} />
              <Input mb={2} size="sm" placeholder="Подпись (Выпуск 2024)" value={review.desc || ''} onChange={(e) => updateArrayItem('reviews', idx, 'desc', e.target.value)} />
              <Input mb={2} size="sm" placeholder="URL фото" value={review.imageUrl || ''} onChange={(e) => updateArrayItem('reviews', idx, 'imageUrl', e.target.value)} />
              <Textarea size="sm" placeholder="Отзыв" value={review.text || ''} onChange={(e) => updateArrayItem('reviews', idx, 'text', e.target.value)} />
            </Box>
          ))}
          <Button mt={2} size="xs" onClick={() => addArrayItem('reviews', { name: '', desc: '', imageUrl: '', text: '' })}>+ Добавить отзыв</Button>
        </Box>
      </VStack>
    );
  }

  // --- Testimonials Form ---
  if (type === 'testimonials') {
    const items = parsedData.items || [];
    return (
      <VStack align="stretch" spacing={4}>
        <Input placeholder="Подзаголовок (Отзывы)" value={parsedData.subtitle || ''} onChange={(e) => updateField('subtitle', e.target.value)} />
        <Input placeholder="Заголовок (Слова родителей...)" value={parsedData.titleHtml || ''} onChange={(e) => updateField('titleHtml', e.target.value)} />
        
        <Box pt={4} borderTop="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" mb={2}>Отзывы (items)</Text>
          {items.map((item, idx) => (
            <Box key={idx} p={3} borderWidth="1px" rounded="md" mb={2} bg="gray.50">
              <Flex justify="space-between" mb={2}>
                 <Text fontWeight="bold" fontSize="sm">Отзыв {idx + 1}</Text>
                 <Button size="xs" colorScheme="red" onClick={() => removeArrayItem('items', idx)}>Удалить</Button>
              </Flex>
              <HStack mb={2}>
                <Input size="sm" placeholder="Имя (Марина К.)" value={item.name || ''} onChange={(e) => updateArrayItem('items', idx, 'name', e.target.value)} />
                <Input size="sm" placeholder="Роль (Мама ученика)" value={item.role || ''} onChange={(e) => updateArrayItem('items', idx, 'role', e.target.value)} />
              </HStack>
              <Textarea size="sm" placeholder="Текст отзыва..." value={item.text || ''} onChange={(e) => updateArrayItem('items', idx, 'text', e.target.value)} mb={2} />
              <HStack mb={2}>
                <Input size="sm" placeholder="Вариант (light/dark)" value={item.variant || ''} onChange={(e) => updateArrayItem('items', idx, 'variant', e.target.value)} />
                <Input size="sm" placeholder="Буква (М)" value={item.avatarLetter || ''} onChange={(e) => updateArrayItem('items', idx, 'avatarLetter', e.target.value)} />
              </HStack>
              <HStack>
                <Input size="sm" placeholder="Цвет фона (blue.50)" value={item.avatarBg || ''} onChange={(e) => updateArrayItem('items', idx, 'avatarBg', e.target.value)} />
                <Input size="sm" placeholder="Цвет текста (blue.600)" value={item.avatarColor || ''} onChange={(e) => updateArrayItem('items', idx, 'avatarColor', e.target.value)} />
              </HStack>
            </Box>
          ))}
          <Button mt={2} size="xs" onClick={() => addArrayItem('items', { name: '', role: '', text: '', variant: 'light', avatarLetter: '', avatarBg: 'blue.50', avatarColor: 'blue.600' })}>+ Добавить отзыв</Button>
        </Box>
      </VStack>
    );
  }

  // --- LocationMap Form ---
  if (type === 'location') {
    return (
      <VStack align="stretch" spacing={4}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Заголовок</Text>
          <Input value={parsedData.title || ''} onChange={(e) => updateField('title', e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Адрес</Text>
          <Input value={parsedData.address || ''} onChange={(e) => updateField('address', e.target.value)} />
        </Box>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={1}>Координаты (широта, долгота)</Text>
          <HStack>
            <Input placeholder="Широта (lat)" value={parsedData.lat || ''} onChange={(e) => updateField('lat', parseFloat(e.target.value))} />
            <Input placeholder="Долгота (lng)" value={parsedData.lng || ''} onChange={(e) => updateField('lng', parseFloat(e.target.value))} />
          </HStack>
        </Box>
      </VStack>
    );
  }

  // --- Fallback (JSON Editor) ---
  return (
    <Box>
      <Text fontSize="sm" color="gray.500" mb={2}>Для этого типа блока пока нет визуального интерфейса. Пожалуйста, используйте JSON.</Text>
      <Textarea 
        value={dataStr} 
        onChange={(e) => onChange(e.target.value)} 
        rows={15} 
        fontFamily="monospace"
        fontSize="sm"
      />
    </Box>
  );
}
