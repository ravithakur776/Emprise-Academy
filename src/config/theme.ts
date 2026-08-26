/**
 * Emprise Academy Design Tokens & Brand System
 * Official Colors:
 * - Deep Navy (#0A192F, #0D2342, #132E59)
 * - Vibrant Orange (#FF6B00, #FA5A00, #EA580C)
 * - Neutral Slate & Off-White (#F8FAFC, #F1F5F9, #FFFFFF, #0F172A)
 */

export const brandColors = {
  navy: {
    DEFAULT: "#0A192F",
    50: "#F0F4F8",
    100: "#D9E2EC",
    200: "#BCCCDC",
    300: "#9FB3C8",
    400: "#627D98",
    500: "#486581",
    600: "#334E68",
    700: "#243B53",
    800: "#132E59",
    900: "#0D2342",
    950: "#0A192F",
  },
  orange: {
    DEFAULT: "#FF6B00",
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",
    500: "#FF6B00",
    600: "#EA580C",
    700: "#C2410C",
    800: "#9A3412",
    900: "#7C2D12",
    950: "#431407",
  },
  surface: {
    light: "#F8FAFC",
    card: "#FFFFFF",
    dark: "#0A192F",
    darkCard: "#0D2342",
  },
} as const;
