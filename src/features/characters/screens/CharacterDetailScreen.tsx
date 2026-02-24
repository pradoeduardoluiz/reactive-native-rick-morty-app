/**
 * Character Detail Screen
 * Displays detailed information about a specific character
 */

import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme';
import type { RootStackScreenProps } from '../../../navigation/types';

type Props = RootStackScreenProps<'CharacterDetail'>;

export function CharacterDetailScreen({ route }: Props) {
  const { characterId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Character Detail</Text>
      <Text style={styles.subtitle}>Character ID: {characterId}</Text>
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
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  info: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
  },
});
