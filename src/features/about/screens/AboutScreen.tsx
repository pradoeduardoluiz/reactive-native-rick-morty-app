/**
 * About Screen
 * Information about the app
 */

import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme';
import type { TabScreenProps } from '../../../navigation/types';

type Props = TabScreenProps<'About'>;

export function AboutScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick & Morty App</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <Text style={styles.description}>
        An app to explore characters, locations, and episodes from the Rick and Morty universe.
      </Text>
      <Text style={styles.api}>Powered by Rick and Morty API</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  version: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  description: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.lg,
    marginBottom: theme.spacing.xl,
  },
  api: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
    fontStyle: 'italic',
  },
});
