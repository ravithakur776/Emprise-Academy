/**
 * Emprise Academy Design Tokens & Brand System
 * Official Single Source of Truth
 *
 * Core Brand Pillars:
 * - Deep Navy: Inspired by Emprise Logo (#0A192F, #0D2342, #132E59)
 * - Vibrant Orange: Inspired by Emprise Logo (#FF6B00, #FA5A00, #EA580C)
 * - Restrained Gold: For Academic Toppers & Achievements (#D97706, #B45309)
 * - Off-White & Neutral Surfaces: (#F8FAFC, #FFFFFF, #F1F5F9)
 */

export const brandTokens = {
  colors: {
    primary: {
      DEFAULT: "#0A192F",
      dark: "#0D2342",
      light: "#132E59",
      hover: "#1E3A8A",
    },
    accent: {
      DEFAULT: "#FF6B00",
      vibrant: "#FA5A00",
      light: "#FF8533",
      hover: "#EA580C",
    },
    gold: {
      DEFAULT: "#D97706",
      light: "#F59E0B",
      dark: "#B45309",
    },
    neutral: {
      background: "#F8FAFC",
      surface: "#FFFFFF",
      surfaceDark: "#0D2342",
      text: "#0F172A",
      textMuted: "#64748B",
      border: "#E2E8F0",
      borderDark: "#334155",
    },
    feedback: {
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#3B82F6",
    },
  },
  typography: {
    fontSans: "var(--font-sans)",
    fontDisplay: "var(--font-display)",
  },
  cssVariables: {
    "--brand-primary": "#0A192F",
    "--brand-primary-dark": "#0D2342",
    "--brand-primary-light": "#132E59",
    "--brand-accent": "#FF6B00",
    "--brand-accent-vibrant": "#FA5A00",
    "--brand-accent-light": "#FF8533",
    "--brand-gold": "#D97706",
    "--brand-gold-light": "#F59E0B",
    "--brand-background": "#F8FAFC",
    "--brand-surface": "#FFFFFF",
    "--brand-text": "#0F172A",
    "--brand-muted": "#64748B",
    "--brand-border": "#E2E8F0",
    "--brand-success": "#10B981",
    "--brand-warning": "#F59E0B",
    "--brand-danger": "#EF4444",
  },
} as const;

export type BrandTokens = typeof brandTokens;
export const brandColors = brandTokens.colors;
