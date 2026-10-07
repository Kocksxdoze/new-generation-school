"use client";

import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function AdminError({ error, reset }) {
  useEffect(() => {
    console.error("Admin route error boundary caught:", error);
  }, [error]);

  return (
    <Box minH="60vh" display="flex" alignItems="center" justifyContent="center" p={6}>
      <VStack spacing={4} maxW="500px" bg="white" p={8} rounded="2xl" boxShadow="md" textAlign="center">
        <Heading size="md" color="#002045">
          Не удалось загрузить раздел панели
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {error?.message || "Произошла временная ошибка при загрузке данных панели управления."}
        </Text>
        <Button
          bg="#002045"
          color="white"
          _hover={{ bg: "#003366" }}
          onClick={() => (reset ? reset() : window.location.reload())}
        >
          Повторить попытку
        </Button>
      </VStack>
    </Box>
  );
}
