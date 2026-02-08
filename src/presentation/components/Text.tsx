/**
 * Reusable UI Component: Text
 * Type-safe text component with typography presets
 */
import React from 'react';
import {Text as RNText, TextProps as RNTextProps, StyleSheet} from 'react-native';
import {theme, Typography} from '@shared/theme';

interface TextProps extends RNTextProps {
  variant?: Typography;
  color?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = theme.colors.text,
  style,
  children,
  ...props
}) => {
  return (
    <RNText
      style={[theme.typography[variant], {color}, style]}
      {...props}>
      {children}
    </RNText>
  );
};
