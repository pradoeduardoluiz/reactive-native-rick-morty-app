/**
 * Character Detail Screen
 * Displays detailed information about a specific character
 */

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';
import { theme } from '../../../theme';
import type { Character } from '../../../shared/types/api';
import type { RootStackScreenProps } from '../../../navigation/types';
import { useCharacter } from '../hooks/useCharacter';
import { FavoriteButton } from '../components/FavoriteButton';

type Props = RootStackScreenProps<'CharacterDetail'>;

const MAX_EPISODES = 5;

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

const extractEpisodeCode = (url: string): string => {
  const id = url.split('/').filter(Boolean).pop();
  return id ? `Episode #${id}` : url;
};

export function CharacterDetailScreen({ route }: Props) {
  const { characterId } = route.params;
  const { data: character, isLoading, error } = useCharacter(characterId);

  if (isLoading) {
    return <LoadingSpinner message="Loading character..." />;
  }

  if (error || !character) {
    return (
      <ErrorState
        title="Character not found"
        message="We couldn't load this character. Please try again."
      />
    );
  }

  const statusColor = getStatusColor(character.status);
  const firstEpisodes = character.episode.slice(0, MAX_EPISODES);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <View style={styles.favoriteButtonWrapper}>
          <FavoriteButton characterId={characterId} size="lg" />
        </View>
      </View>

      {/* Name & status */}
      <View style={styles.headerSection}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{character.status}</Text>
        </View>
      </View>

      {/* Basic info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Character Info</Text>
        <View style={styles.card}>
          <InfoRow label="Species" value={character.species} />
          <InfoRow label="Gender" value={character.gender} />
          {character.type ? <InfoRow label="Type" value={character.type} /> : null}
        </View>
      </View>

      {/* Origin & Location */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.card}>
          <InfoRow label="Origin" value={character.origin.name} />
          <InfoRow label="Current Location" value={character.location.name} isLast />
        </View>
      </View>

      {/* Episodes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Episodes{character.episode.length > MAX_EPISODES ? ` (first ${MAX_EPISODES} of ${character.episode.length})` : ''}
        </Text>
        <View style={styles.card}>
          {firstEpisodes.map((episodeUrl, index) => (
            <InfoRow
              key={episodeUrl}
              label={`#${index + 1}`}
              value={extractEpisodeCode(episodeUrl)}
              isLast={index === firstEpisodes.length - 1}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// ---------------------------------------------------------------------------
// Sub-component
// ---------------------------------------------------------------------------

interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

function InfoRow({ label, value, isLast = false }: InfoRowProps) {
  return (
    <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingBottom: theme.spacing['2xl'],
  },

  // Image
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },

  // Favorite button
  favoriteButtonWrapper: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
  },

  // Header (name + status)
  headerSection: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    flexShrink: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.xs,
  },
  statusText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  // Sections
  section: {
    paddingHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },

  // Card
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  // Info row
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
  },
  infoRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.gray[200],
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
    flex: 1,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
    flex: 2,
    textAlign: 'right',
  },
});
