import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTokens,
} from "@chakra-ui/react";

const tokens = defineTokens({
  fonts: {
    heading: `var(--font-manrope), sans-serif`,
    body: `var(--font-inter), sans-serif`,
  },
  colors: {
    brand: {
      primaryNavy: { value: "#002045" },
      accentGold: { value: "#fdbb31" },
      accentGoldHover: { value: "#e5a600" },
      navySoft: { value: "#004080" },
    },
    surface: {
      surfaceLight: { value: "#f8fafc" },
      surfaceGlass: { value: "rgba(255, 255, 255, 0.7)" },
      panel: { value: "#ffffff" },
      textMuted: { value: "#f1f5f9" },
    },
    text: {
      main: { value: "#0f172a" },
      textMuted: { value: "#64748b" },
    },
    border: {
      borderLight: { value: "rgba(15, 23, 42, 0.05)" },
    },
  },
  shadows: {
    glass: { value: "0 8px 32px 0 rgba(0, 32, 69, 0.05)" },
    premium: { value: "0 20px 40px -15px rgba(0, 32, 69, 0.1)" },
    apple: { value: "0 4px 24px -6px rgba(0, 0, 0, 0.05)" },
  },
  radii: {
    xl: { value: "1.25rem" },
    "2xl": { value: "1.5rem" },
    "3xl": { value: "2rem" },
    "4xl": { value: "2.5rem" },
  },
});

const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens,
    },
    globalCss: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        bg: "surface.light",
        color: "text.main",
      },
      "*::selection": {
        background: "brand.navy",
        color: "white",
      },
      ".material-symbols-outlined": {
        fontVariationSettings: '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
        userSelect: "none",
      },
      ".glass-panel": {
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      },
      ".text-gradient": {
        bgGradient: "linear-gradient(135deg, #002045 0%, #004080 100%)",
        backgroundClip: "text",
        color: "transparent",
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
        border: "1px solid rgba(0, 0, 0, 0.03)",
        transition: "all 0.3s ease",
      },
      ".apple-card:hover": {
        boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.08)",
        transform: "scale(1.01)",
      },
    },
  }),
);

export default system;
