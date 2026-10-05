"use client";

import { Box, Text } from "@chakra-ui/react";
import { useState, useCallback } from "react";

export function useAdminToast() {
  const [toastData, setToastData] = useState(null);

  const showToast = useCallback(({ title, description, status = "success", duration = 3000 }) => {
    setToastData({ title, description, status });
    setTimeout(() => {
      setToastData(null);
    }, duration);
  }, []);

  return { toast: showToast, toastData };
}

export default function AdminToast({ toastData }) {
  if (!toastData) return null;

  const isError = toastData.status === "error";
  const isWarning = toastData.status === "warning";
  const bg = isError ? "#C53030" : isWarning ? "#DD6B20" : "#002045";
  const borderColor = isError ? "#FC8181" : isWarning ? "#FBD38D" : "#FFB800";

  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      zIndex={99999}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      color="white"
      px={5}
      py={3.5}
      rounded="2xl"
      boxShadow="0 20px 35px -5px rgba(0,0,0,0.3)"
      display="flex"
      alignItems="center"
      gap={3}
      maxW="md"
    >
      <Box as="span" className="material-symbols-outlined" color={borderColor} fontSize="24px">
        {isError ? "error" : isWarning ? "warning" : "check_circle"}
      </Box>
      <Box flex={1}>
        <Text fontWeight="bold" fontSize="sm">{toastData.title}</Text>
        {toastData.description && (
          <Text fontSize="xs" color="gray.200" mt={0.5}>{toastData.description}</Text>
        )}
      </Box>
    </Box>
  );
}
