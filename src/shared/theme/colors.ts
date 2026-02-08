/**
 * Design System - Colors
 * Similar to Android colors.xml
 */
export const colors = {
  // Primary palette
  primary: '#00BCD4', // Cyan - Rick's portal color
  primaryDark: '#0097A7',
  primaryLight: '#B2EBF2',
  
  // Secondary palette
  secondary: '#8BC34A', // Green - Portal goo
  secondaryDark: '#689F38',
  secondaryLight: '#DCEDC8',
  
  // Neutral palette
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  
  // Dark theme
  backgroundDark: '#121212',
  surfaceDark: '#1E1E1E',
  cardDark: '#2C2C2C',
  
  // Text
  text: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',
  textInverse: '#FFFFFF',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Character status colors
  alive: '#4CAF50',
  dead: '#F44336',
  unknown: '#9E9E9E',
  
  // Borders & dividers
  border: '#E0E0E0',
  divider: '#EEEEEE',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(0, 0, 0, 0.12)',
} as const;

export type Color = keyof typeof colors;
