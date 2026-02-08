/**
 * Design System - Typography
 * Similar to Android textAppearance styles
 */
import {TextStyle} from 'react-native';

export const fontFamily = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  // You can replace with custom fonts like:
  // regular: 'Roboto-Regular',
  // medium: 'Roboto-Medium',
  // bold: 'Roboto-Bold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semiBold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
} as const;

/**
 * Typography presets
 * Similar to Android TextAppearance.* styles
 */
export const typography = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xxxl * lineHeight.tight,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xxl * lineHeight.tight,
  },
  h3: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.xl * lineHeight.normal,
  },
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.lg * lineHeight.normal,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.lg * lineHeight.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.xs * lineHeight.normal,
  },
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.md * lineHeight.normal,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
} as const;

export type Typography = keyof typeof typography;
