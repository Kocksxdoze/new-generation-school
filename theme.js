"use client";

import { extendTheme } from "@chakra-ui/react";

// Точная копия значений из исходного tailwind.config в code.html
const theme = extendTheme({
  fonts: {
    heading: `var(--font-manrope), sans-serif`,
    body: `var(--font-inter), sans-serif`,
  },
  colors: {
    primaryNavy: "#002045",
    accentGold: "#FFB800",
    accentGoldHover: "#E5A600",
    surfaceLight: "#F8FAFC",
    surfaceGlass: "rgba(255, 255, 255, 0.8)",
    textMain: "#0F172A",
    textMuted: "#64748B",
    borderLight: "rgba(15, 23, 42, 0.05)",
    // Точные оттенки Tailwind (по умолчанию в Chakra палитра отличается),
    // переопределяем только используемые в дизайне ступени.
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      600: "#9333ea",
      700: "#7e22ce",
    },
    emerald: {
      50: "#ecfdf5",
      600: "#059669",
    },
    amber: {
      50: "#fffbeb",
      200: "#fde68a",
      500: "#f59e0b",
      600: "#d97706",
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      400: "#9ca3af",
    },
    green: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
    },
  },
  radii: {
    "4xl": "2rem",
    "5xl": "2.5rem",
  },
  shadows: {
    glass: "0 8px 32px 0 rgba(0, 32, 69, 0.05)",
    premium: "0 20px 40px -15px rgba(0, 32, 69, 0.1)",
    apple: "0 4px 24px -6px rgba(0, 0, 0, 0.05)",
  },
  styles: {
    global: {
      body: {
        bg: "surfaceLight",
        color: "textMain",
        fontFamily: "body",
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
      },
      "::selection": {
        background: "primaryNavy",
        color: "white",
      },
      ".material-symbols-outlined": {
        fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      },
      ".glass-panel": {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      },
      ".text-gradient": {
        background: "linear-gradient(135deg, #002045 0%, #004080 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      ".bento-card": {
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      ".bento-card:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 24px 48px -12px rgba(0, 32, 69, 0.15)",
      },
      ".bg-pattern": {
        backgroundImage: "radial-gradient(#002045 0.5px, transparent 0.5px)",
        backgroundSize: "24px 24px",
        opacity: 0.03,
      },
      ".apple-card": {
        background: "#ffffff",
        borderRadius: "2rem",
        boxShadow: "0 4px 24px -6px rgba(0, 0, 0, 0.03)",
        border: "1px solid rgba(0,0,0,0.03)",
        transition: "all 0.3s ease",
      },
      ".apple-card:hover": {
        boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.08)",
        transform: "scale(1.01)",
      },
    },
  },
});

export default theme;
