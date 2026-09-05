"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/utils/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login(username, password);
      router.push("/admin");
    } catch (error) {
      alert(error.response?.data?.error || "Неверные учетные данные");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box w="full" maxW="md" p={8} bg="white" borderRadius="lg" boxShadow="lg">
        <VStack spacing={6} as="form" onSubmit={handleLogin}>
          <Heading size="lg" textAlign="center">
            Вход в админ-панель
          </Heading>
          <Text color="gray.500" textAlign="center">
            Введите логин и пароль для доступа
          </Text>

          <Box w="full">
            <Text as="label" display="block" mb={2} fontWeight="medium">
              Имя пользователя
            </Text>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </Box>

          <Box w="full">
            <Text as="label" display="block" mb={2} fontWeight="medium">
              Пароль
            </Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Box>

          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isLoading={isLoading}
            loadingText="Вход..."
          >
            Войти
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
