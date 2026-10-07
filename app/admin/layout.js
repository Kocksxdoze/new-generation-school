"use client";

import { Box, Flex, VStack, Heading, Text, Link as ChakraLink, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService } from '@/utils/api';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    // Check auth
    authService.getMe()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathname, isLoginPage, router]);

  if (isLoading) {
    return (
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Text>Загрузка...</Text>
      </Flex>
    );
  }

  // If login page, don't show sidebar
  if (isLoginPage) {
    return <Box minH="100vh" bg="gray.50">{children}</Box>;
  }

  // Only render if authenticated
  if (!isAuthenticated) return null;

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navItems = [
    { name: 'Дашборд', path: '/admin', icon: 'dashboard' },
    { name: 'Заявки', path: '/admin/applications', icon: 'description' },
    { name: 'Преподаватели', path: '/admin/teachers', icon: 'school' },
    { name: 'Университеты', path: '/admin/universities', icon: 'account_balance' },
    { name: 'Новости', path: '/admin/news', icon: 'newspaper' },
    { name: 'Галерея кампуса', path: '/admin/gallery', icon: 'photo_library' },
    { name: 'Медиатека', path: '/admin/media', icon: 'perm_media' },
    { name: 'Страницы и блоки', path: '/admin/pages', icon: 'view_quilt' },
    { name: 'Инструкция для админов', path: '/admin/guide', icon: 'menu_book' },
  ];

  return (
    <Flex h="100vh" overflow="hidden" bg="gray.100" direction="column">
      {/* Mobile Top Header */}
      <Box
        display={{ base: "block", md: "none" }}
        bg="white"
        boxShadow="sm"
        borderBottom="1px solid"
        borderColor="gray.200"
        zIndex={100}
      >
        <Flex px={4} py={3} justify="space-between" align="center">
          <Heading size="sm" color="blue.600">
            NGS Admin
          </Heading>
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            {mobileNavOpen ? "Закрыть ✕" : "Меню ☰"}
          </Button>
        </Flex>

        {mobileNavOpen && (
          <Box p={4} bg="gray.50" borderTop="1px solid" borderColor="gray.200" maxH="75vh" overflowY="auto">
            <VStack align="stretch" spacing={1.5}>
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                return (
                  <ChakraLink
                    as={Link}
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileNavOpen(false)}
                    px={3}
                    py={2}
                    borderRadius="md"
                    bg={isActive ? 'blue.600' : 'white'}
                    color={isActive ? 'white' : 'gray.800'}
                    fontWeight={isActive ? 'bold' : 'medium'}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    border="1px solid"
                    borderColor={isActive ? "blue.600" : "gray.200"}
                  >
                    {item.icon && (
                      <Box as="span" className="material-symbols-outlined" fontSize="18px">
                        {item.icon}
                      </Box>
                    )}
                    {item.name}
                  </ChakraLink>
                );
              })}
              <Button
                mt={2}
                colorScheme="red"
                size="sm"
                onClick={handleLogout}
                w="full"
              >
                Выйти
              </Button>
            </VStack>
          </Box>
        )}
      </Box>

      <Flex flex={1} overflow="hidden">
        {/* Desktop Sidebar */}
        <Box w="250px" bg="white" boxShadow="md" display={{ base: 'none', md: 'block' }}>
          <VStack align="stretch" h="full" p={4} spacing={6}>
            <Heading size="md" color="blue.600" textAlign="center" py={4}>
              NGS Admin
            </Heading>
            
            <VStack align="stretch" spacing={2} flex={1}>
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                return (
                  <ChakraLink
                    as={Link}
                    key={item.path}
                    href={item.path}
                    px={3}
                    py={2.5}
                    borderRadius="lg"
                    bg={isActive ? 'blue.50' : 'transparent'}
                    color={isActive ? 'blue.600' : 'gray.700'}
                    fontWeight={isActive ? 'bold' : 'medium'}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    transition="all 0.2s"
                    _hover={{ bg: 'blue.50', color: 'blue.600', textDecoration: 'none' }}
                  >
                    {item.icon && (
                      <Box as="span" className="material-symbols-outlined" fontSize="20px">
                        {item.icon}
                      </Box>
                    )}
                    {item.name}
                  </ChakraLink>
                );
              })}
            </VStack>

            <Button colorScheme="red" variant="ghost" onClick={handleLogout} w="full">
              Выйти
            </Button>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} overflowY="auto" p={{ base: 4, sm: 6, md: 8 }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
