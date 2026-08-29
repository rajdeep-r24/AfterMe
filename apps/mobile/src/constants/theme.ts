/**
 * AfterMe Mobile Design Tokens & Theme Constants
 */

export const Colors = {
  // Backgrounds
  bgBase: '#07090f',
  bgPrimary: '#0c1526',
  bgSecondary: '#111e33',
  bgTertiary: '#172240',
  bgCard: '#0f1a2e',
  bgInput: '#0b1322',

  // Borders
  borderFaint: 'rgba(255, 255, 255, 0.04)',
  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderDefault: 'rgba(255, 255, 255, 0.12)',
  borderHighlight: 'rgba(79, 110, 247, 0.4)',

  // Typography
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textTertiary: '#64748b',
  textMuted: '#475569',

  // Accents
  accent: '#4F6EF7',
  accentSubtle: 'rgba(79, 110, 247, 0.12)',
  accentGlow: 'rgba(79, 110, 247, 0.25)',

  // Semantic Status
  success: '#10b981',
  successSubtle: 'rgba(16, 185, 129, 0.12)',
  successText: '#34d399',

  warning: '#f59e0b',
  warningSubtle: 'rgba(245, 158, 11, 0.12)',
  warningText: '#fbbf24',

  danger: '#ef4444',
  dangerSubtle: 'rgba(239, 68, 68, 0.12)',
  dangerText: '#f87171',

  info: '#06b6d4',
  infoSubtle: 'rgba(6, 182, 212, 0.12)',
  infoText: '#38bdf8',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 9999,
} as const;
