"use client";

import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  HStack,
  VStack,
  Grid,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { applicationsService } from "@/utils/api";

export default function AdminApplicationsPage() {
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [meta, setMeta] = useState({ page: 1, total: 0, newCount: 0 });
  const [selectedApp, setSelectedApp] = useState(null);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (search.trim()) params.search = search.trim();
      const res = await applicationsService.getAllApplications(params);
      const list = res.data || [];
      setApplications(list);
      setMeta(res.meta || { page: 1, total: list.length, newCount: list.filter(a => a.status === 'NEW').length });
    } catch (err) {
      console.error("Failed to load applications", err);
      // Fallback empty list without crashing page
      setApplications([]);
      setErrorMessage(
        err?.response?.status === 401
          ? "Сессия истекла. Пожалуйста, выполните повторный вход в админ-панель."
          : "Не удалось подключиться к серверу заявок. Проверьте соединение."
      );
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadApplications();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadApplications]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await applicationsService.updateStatus(id, newStatus);
      setNotice("Статус успешно обновлен");
      setTimeout(() => setNotice(""), 3000);
      loadApplications();
    } catch (err) {
      console.error("Failed to update status", err);
      setNotice("Ошибка обновления статуса");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Вы уверены, что хотите удалить эту заявку?")) return;
    try {
      await applicationsService.deleteApplication(id);
      setNotice("Заявка удалена");
      setTimeout(() => setNotice(""), 3000);
      loadApplications();
    } catch (err) {
      console.error("Failed to delete application", err);
      setNotice("Ошибка удаления заявки");
      setTimeout(() => setNotice(""), 3000);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "NEW":
        return <Badge bg="red.100" color="red.800" px={2.5} py={1} rounded="full" fontWeight="bold">Новая</Badge>;
      case "CONTACTED":
        return <Badge bg="yellow.100" color="yellow.800" px={2.5} py={1} rounded="full" fontWeight="bold">В обработке</Badge>;
      case "RESOLVED":
        return <Badge bg="green.100" color="green.800" px={2.5} py={1} rounded="full" fontWeight="bold">Завершена</Badge>;
      case "ARCHIVED":
        return <Badge bg="gray.100" color="gray.800" px={2.5} py={1} rounded="full" fontWeight="bold">В архиве</Badge>;
      default:
        return <Badge px={2.5} py={1} rounded="full">{status}</Badge>;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "admission":
        return "Поступление";
      case "consultation":
        return "Консультация";
      case "tour":
        return "Экскурсия";
      case "question":
        return "Вопрос";
      default:
        return type || "Заявка";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={4}>
        <Box>
          <HStack spacing={3}>
            <Heading size="lg" color="#002045">
              Заявки и обращения
            </Heading>
            {meta.newCount > 0 && (
              <Badge bg="red.500" color="white" fontSize="xs" px={3} py={1} rounded="full">
                +{meta.newCount} новых
              </Badge>
            )}
          </HStack>
          <Text color="gray.500" mt={1}>
            Все обращения родителей и кандидатов, поступившие с сайта
          </Text>
        </Box>

        <Button
          onClick={loadApplications}
          variant="outline"
          size="sm"
          borderColor="gray.300"
        >
          <HStack spacing={1}>
            <Box as="span" className="material-symbols-outlined" fontSize="sm">refresh</Box>
            <Text>Обновить</Text>
          </HStack>
        </Button>
      </Flex>

      {notice && (
        <Box mb={6} p={3} rounded="xl" bg="green.50" border="1px solid" borderColor="green.200" color="green.800" fontWeight="medium">
          ✓ {notice}
        </Box>
      )}

      {errorMessage && (
        <Box mb={6} p={3} rounded="xl" bg="red.50" border="1px solid" borderColor="red.200" color="red.800" fontWeight="medium">
          ⚠️ {errorMessage}
        </Box>
      )}

      {/* Filter and Search Bar */}
      <Flex
        bg="white"
        p={4}
        rounded="xl"
        boxShadow="sm"
        mb={6}
        justify="space-between"
        align="center"
        gap={4}
        flexWrap="wrap"
      >
        <HStack spacing={2} overflowX="auto">
          {[
            { id: "all", label: `Все (${meta.total})` },
            { id: "NEW", label: "Новые" },
            { id: "CONTACTED", label: "В обработке" },
            { id: "RESOLVED", label: "Завершенные" },
          ].map((tab) => (
            <Button
              key={tab.id}
              size="sm"
              rounded="lg"
              variant={statusFilter === tab.id ? "solid" : "ghost"}
              bg={statusFilter === tab.id ? "#002045" : "transparent"}
              color={statusFilter === tab.id ? "white" : "gray.600"}
              _hover={{ bg: statusFilter === tab.id ? "#001835" : "gray.100" }}
              onClick={() => setStatusFilter(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </HStack>

        <Box w={{ base: "full", md: "280px" }} position="relative">
          <Box
            as="span"
            className="material-symbols-outlined"
            position="absolute"
            left="12px"
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
            fontSize="sm"
            zIndex={2}
            pointerEvents="none"
          >
            search
          </Box>
          <Input
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="sm"
            pl="36px"
            rounded="lg"
          />
        </Box>
      </Flex>

      {/* Table */}
      <Box bg="white" p={4} rounded="xl" boxShadow="sm" overflow="hidden">
        {loading ? (
          <Flex justify="center" align="center" h="250px">
            <Spinner size="lg" color="blue.500" />
          </Flex>
        ) : applications.length === 0 ? (
          <Box textAlign="center" py={12}>
            <Box as="span" className="material-symbols-outlined" fontSize="4xl" color="gray.300" mb={2} display="block">
              inbox
            </Box>
            <Text color="gray.500">Заявок пока нет или они не загружены</Text>
          </Box>
        ) : (
          <Box overflowX="auto">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0", color: "#64748B", fontSize: "12px", textTransform: "uppercase" }}>
                  <th style={{ padding: "12px" }}>Дата</th>
                  <th style={{ padding: "12px" }}>Родитель / Контакт</th>
                  <th style={{ padding: "12px" }}>Цель</th>
                  <th style={{ padding: "12px" }}>Класс</th>
                  <th style={{ padding: "12px" }}>Сообщение</th>
                  <th style={{ padding: "12px" }}>Статус</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "12px", whiteSpace: "nowrap", fontSize: "12px", color: "#64748B" }}>
                      {formatDate(app.createdAt)}
                    </td>

                    <td style={{ padding: "12px" }}>
                      <Text fontWeight="bold" color="#002045" fontSize="sm">
                        {app.fullName}
                      </Text>
                      <Text
                        color="#002045"
                        fontSize="xs"
                        fontWeight="medium"
                        userSelect="all"
                      >
                        {app.phone}
                      </Text>
                      {app.email && (
                        <Text fontSize="11px" color="gray.400">
                          {app.email}
                        </Text>
                      )}
                    </td>

                    <td style={{ padding: "12px" }}>
                      <Badge bg="purple.100" color="purple.800" px={2} py={0.5} rounded="md" fontSize="xs">
                        {getTypeLabel(app.type)}
                      </Badge>
                    </td>

                    <td style={{ padding: "12px", fontSize: "13px", color: "#334155" }}>
                      {app.childGrade || "—"}
                    </td>

                    <td style={{ padding: "12px", maxWidth: "250px" }}>
                      <Text
                        fontSize="xs"
                        color="gray.600"
                        noOfLines={2}
                        cursor="pointer"
                        onClick={() => setSelectedApp(app)}
                        _hover={{ color: "blue.600" }}
                      >
                        {app.message || "Без комментария"}
                      </Text>
                    </td>

                    <td style={{ padding: "12px" }}>
                      <select
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: "1px solid #CBD5E1",
                          background: "#fff",
                          color: "#1E293B",
                          cursor: "pointer",
                          outline: "none",
                        }}
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      >
                        <option value="NEW">Новая</option>
                        <option value="CONTACTED">В обработке</option>
                        <option value="RESOLVED">Завершена</option>
                        <option value="ARCHIVED">В архиве</option>
                      </select>
                    </td>

                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <HStack spacing={2} justify="flex-end">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => setSelectedApp(app)}
                        >
                          Детали
                        </Button>
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          color="red.500"
                          _hover={{ bg: "red.50" }}
                          onClick={() => handleDelete(app.id)}
                        >
                          Удалить
                        </Button>
                      </HStack>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Box>

      {/* Detail Overlay Panel */}
      {selectedApp && (
        <Box
          position="fixed"
          inset={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={() => setSelectedApp(null)}
        >
          <Box
            bg="white"
            p={6}
            rounded="2xl"
            maxW="540px"
            w="full"
            boxShadow="2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color="#002045">
                Заявка #{selectedApp.id}
              </Heading>
              <Button size="xs" onClick={() => setSelectedApp(null)}>
                Закрыть
              </Button>
            </Flex>

            <VStack align="stretch" spacing={4}>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="xs" color="gray.400">Дата отправки</Text>
                  <Text fontWeight="medium" fontSize="sm">{formatDate(selectedApp.createdAt)}</Text>
                </Box>
                {getStatusBadge(selectedApp.status)}
              </Flex>

              <Box p={4} bg="gray.50" rounded="xl">
                <Text fontSize="xs" color="gray.400">Родитель</Text>
                <Heading size="sm" color="#002045" mb={1}>{selectedApp.fullName}</Heading>
                <Text color="#002045" fontWeight="bold" userSelect="all">
                  📞 {selectedApp.phone}
                </Text>
                {selectedApp.email && (
                  <Text fontSize="sm" color="gray.600" userSelect="all">✉️ {selectedApp.email}</Text>
                )}
              </Box>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box p={3} border="1px solid" borderColor="gray.100" rounded="lg">
                  <Text fontSize="xs" color="gray.400">Цель обращения</Text>
                  <Text fontWeight="bold" fontSize="sm">{getTypeLabel(selectedApp.type)}</Text>
                </Box>
                <Box p={3} border="1px solid" borderColor="gray.100" rounded="lg">
                  <Text fontSize="xs" color="gray.400">Класс ребенка</Text>
                  <Text fontWeight="bold" fontSize="sm">{selectedApp.childGrade || "Не указан"}</Text>
                </Box>
              </Grid>

              <Box>
                <Text fontSize="xs" color="gray.400" mb={1}>Сообщение / Комментарий</Text>
                <Box p={4} bg="gray.50" rounded="xl" fontSize="sm" color="gray.700" whiteSpace="pre-wrap">
                  {selectedApp.message || "Клиент не оставил дополнительного комментария."}
                </Box>
              </Box>

              <Flex justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="gray.100">
                <select
                  style={{
                    fontSize: "13px",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    border: "1px solid #CBD5E1",
                    background: "#fff",
                    color: "#1E293B",
                    cursor: "pointer",
                    outline: "none",
                    width: "160px",
                  }}
                  value={selectedApp.status}
                  onChange={(e) => {
                    handleStatusChange(selectedApp.id, e.target.value);
                    setSelectedApp({ ...selectedApp, status: e.target.value });
                  }}
                >
                  <option value="NEW">Новая</option>
                  <option value="CONTACTED">В обработке</option>
                  <option value="RESOLVED">Завершена</option>
                  <option value="ARCHIVED">В архиве</option>
                </select>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(selectedApp.phone);
                    }
                    setNotice(`Номер ${selectedApp.phone} скопирован в буфер обмена`);
                    setTimeout(() => setNotice(""), 3000);
                  }}
                >
                  Скопировать номер
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
}
