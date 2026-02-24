/**
 * Spacing system - Consistent spacing scale
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,
} as const;

export type Spacing = typeof spacing;

/**
 * Border radius values
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export type BorderRadius = typeof borderRadius;

/**
 * Common layout dimensions
 */
export const layout = {
  headerHeight: 60,
  tabBarHeight: 60,
  screenPadding: 16,
  cardPadding: 16,
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const;

export type Layout = typeof layout;
