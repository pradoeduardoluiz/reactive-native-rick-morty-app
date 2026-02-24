/**
 * Theme system - Central export for all theme tokens
 */

export { colors, type Colors } from './colors';
export { typography, type Typography } from './typography';
export {
  spacing,
  borderRadius,
  layout,
  type Spacing,
  type BorderRadius,
  type Layout,
} from './spacing';

import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, layout } from './spacing';

/**
 * Complete theme object
 */
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  layout,
} as const;

export type Theme = typeof theme;
