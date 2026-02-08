/**
 * Theme index
 * Centralized access to design system tokens
 */
export * from './colors';
export * from './spacing';
export * from './typography';

import {colors} from './colors';
import {spacing, borderRadius, layout} from './spacing';
import {typography, fontFamily, fontSize, fontWeight} from './typography';

/**
 * Main theme object
 * Similar to Android Theme/Style resources
 */
export const theme = {
  colors,
  spacing,
  borderRadius,
  layout,
  typography,
  fontFamily,
  fontSize,
  fontWeight,
} as const;

export type Theme = typeof theme;
