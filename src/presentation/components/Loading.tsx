/**
 * Reusable UI Component: Loading
 */
import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Text} from './Text';
import {theme} from '@shared/theme';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({message = 'Loading...'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text variant="body" style={styles.text}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
});
