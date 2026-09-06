/**
 * Canonical Design System Tokens & Brand Configuration
 * Emprise Academy — Master Theme Tokens
 */

export const THEME_CONFIG = {
  colors: {
    primary: {
      DEFAULT: '#1769E0', // Academic Blue
      dark: '#123E73',    // Deep Institutional Blue
      mid: '#0B2748',     // Mid Navy
      light: '#4A8DF0',
      soft: '#EEF5FF',    // Light Soft Blue
      hover: '#1358BE',
    },
    accent: {
      DEFAULT: '#FF8A00', // Energetic Orange CTA
      hover: '#E67A00',
      light: '#FFA433',
    },
    gold: {
      DEFAULT: '#D97706',
      light: '#F59E0B',
      dark: '#B45309',
    },
    background: {
      DEFAULT: '#F8FAFC', // Crisp Light Neutral Page Background
      surface: '#FFFFFF', // Clean White Card / Section Surface
      muted: '#EEF5FF',   // Soft Blue / Neutral Tint
      dark: '#123E73',    // Deep Blue Surface
      midDark: '#0B2748', // Mid Navy Surface
    },
    text: {
      DEFAULT: '#14213D', // Primary Dark Navy Text
      secondary: '#667085', // Secondary Charcoal Slate
      muted: '#8896A6',
      onDark: '#FFFFFF',
      onDarkSecondary: '#E2E8F0',
    },
    border: {
      DEFAULT: '#E3EAF3', // Subtle Refined Border
      light: '#F1F5F9',
      dark: '#123E73',
    },
    status: {
      success: '#16A36A',
      successLight: '#E8F8F0',
      warning: '#C77A00',
      warningLight: '#FFF7EB',
      danger: '#D64545',
      dangerLight: '#FEEFEF',
      info: '#1769E0',
      infoLight: '#EEF5FF',
    },
  },
  typography: {
    fonts: {
      sans: 'var(--font-sans)',
      display: 'var(--font-display)',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    card: '0 1px 3px 0 rgba(18, 62, 115, 0.06), 0 1px 2px -1px rgba(18, 62, 115, 0.04)',
    hover: '0 10px 25px -5px rgba(18, 62, 115, 0.1), 0 8px 10px -6px rgba(18, 62, 115, 0.05)',
    elevated: '0 20px 30px -10px rgba(18, 62, 115, 0.12)',
  },
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
