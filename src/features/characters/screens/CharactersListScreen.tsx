/**
 * Characters List Screen
 * Displays a list of all characters from Rick and Morty
 */

import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme';
import type { TabScreenProps } from '../../../navigation/types';

type Props = TabScreenProps<'Characters'>;

export function CharactersListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characters List</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
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
  },
});
