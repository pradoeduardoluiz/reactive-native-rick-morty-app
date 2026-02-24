/**
 * CharacterCard Component
 * Displays a character card with image, name, species, and status
 */

import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme';
import type { Character } from '../../../shared/types/api';
import { FavoriteButton } from './FavoriteButton';

interface CharacterCardProps {
  character: Character;
  onPress: (characterId: number) => void;
}

/**
 * Get status indicator color based on character status
 */
const getStatusColor = (status: Character['status']): string => {
  switch (status) {
    case 'Alive':
      return theme.colors.status.alive;
    case 'Dead':
      return theme.colors.status.dead;
    default:
      return theme.colors.status.unknown;
  }
};

/**
 * Character Card Component
 * Memoized for performance optimization
 */
export const CharacterCard = React.memo<CharacterCardProps>(({ character, onPress }) => {
  const statusColor = getStatusColor(character.status);

  const handlePress = useCallback(() => {
    onPress(character.id);
  }, [character.id, onPress]);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>
          <FavoriteButton characterId={character.id} size="sm" />
        </View>
        <Text style={styles.species} numberOfLines={1}>
          {character.species}
        </Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
          <Text style={styles.status}>{character.status}</Text>
        </View>
      </View>
    </Pressable>
  );
});

CharacterCard.displayName = 'CharacterCard';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.gray[200],
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
  },
  species: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.xs,
  },
  status: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
  },
});
