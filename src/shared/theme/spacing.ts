/**
 * Design System - Spacing
 * Similar to Android dimens.xml
 * Base unit: 4dp (Android) = 4pt (iOS)
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 999, // Fully rounded
} as const;

/**
 * Layout dimensions
 */
export const layout = {
  screenPadding: spacing.md,
  cardPadding: spacing.md,
  listItemPadding: spacing.md,
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
  avatarSize: {
    sm: 40,
    md: 64,
    lg: 96,
    xl: 128,
  },
} as const;

export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
