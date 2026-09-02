"use client";

import { ChakraProvider } from "@chakra-ui/react";
import system from "@/components/theme";

export default function ThemeProvider({ children }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
