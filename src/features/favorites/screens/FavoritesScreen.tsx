/**
 * Favorites Screen
 * Displays user's favorite characters
 */

import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme';
import type { TabScreenProps } from '../../../navigation/types';

type Props = TabScreenProps<'Favorites'>;

export function FavoritesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Your favorite characters will appear here</Text>
      <Text style={styles.info}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  info: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
  },
});
