/**
 * Color palette inspired by Rick and Morty theme
 */

export const colors = {
  // Primary colors - Rick and Morty green/blue theme
  primary: '#97ce4c', // Portal green
  primaryDark: '#6fa32d',
  primaryLight: '#b5e070',

  // Secondary colors - Sci-fi blue/purple
  secondary: '#44b4d5', // Space blue
  secondaryDark: '#2a8aa8',
  secondaryLight: '#6cc5e0',

  // Accent colors
  accent: '#9f6bff', // Portal purple
  accentDark: '#7a4fd9',
  accentLight: '#b88eff',

  // Background colors
  background: '#f8f9fa',
  backgroundDark: '#1a1d23',
  surface: '#ffffff',
  surfaceDark: '#2a2d35',

  // Text colors
  text: '#1a1d23',
  textSecondary: '#6c757d',
  textLight: '#adb5bd',
  textInverse: '#ffffff',

  // Status colors
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
  info: '#17a2b8',

  // Neutral colors
  gray: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#1a1d23',
  },

  // Character status colors
  status: {
    alive: '#55cc44',
    dead: '#d63d2d',
    unknown: '#9e9e9e',
  },

  // Semantic colors
  border: '#dee2e6',
  borderLight: '#e9ecef',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Transparent
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
