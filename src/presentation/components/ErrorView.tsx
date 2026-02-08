/**
 * Reusable UI Component: Error
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from './Text';
import {theme} from '@shared/theme';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({message, onRetry}) => {
  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.title}>
        Oops!
      </Text>
      <Text variant="body" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text variant="button" color={theme.colors.textInverse}>
            Retry
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.md,
    color: theme.colors.error,
  },
  message: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
});
