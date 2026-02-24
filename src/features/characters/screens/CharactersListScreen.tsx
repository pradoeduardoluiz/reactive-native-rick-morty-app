/**
 * Characters List Screen
 * Displays a list of all characters from Rick and Morty with infinite scroll
 */

import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';

import { theme } from '../../../theme';
import type { TabScreenProps } from '../../../navigation/types';
import { useCharacters } from '../hooks/useCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { LoadingSpinner, EmptyState, ErrorState } from '../../../shared/components';
import type { Character } from '../../../shared/types';

type Props = TabScreenProps<'Characters'>;

export function CharactersListScreen({ navigation }: Props) {
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters();

  // Extract all characters from pages
  const characters = data?.pages.flatMap(page => page.results) ?? [];

  // Handle character press
  const handleCharacterPress = useCallback(
    (characterId: number) => {
      navigation.navigate('CharacterDetail', { characterId });
    },
    [navigation]
  );

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle retry
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Characters</Text>
        </View>
        <View style={styles.centered}>
          <LoadingSpinner size="large" message="Loading characters..." />
        </View>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Characters</Text>
        </View>
        <View style={styles.centered}>
          <ErrorState
            title="Oops!"
            message={error?.message || 'Failed to load characters. Please try again.'}
            onRetry={handleRetry}
          />
        </View>
      </View>
    );
  }

  // Render empty state
  if (characters.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Characters</Text>
        </View>
        <View style={styles.centered}>
          <EmptyState
            icon="🔍"
            title="No Characters Found"
            message="There are no characters to display."
          />
        </View>
      </View>
    );
  }

  // Render list
  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard character={item} onPress={() => handleCharacterPress(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Characters</Text>
            <Text style={styles.headerSubtitle}>
              {data?.pages[0]?.info.count ? `${data.pages[0].info.count} characters` : ''}
            </Text>
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <LoadingSpinner message="Loading more..." />
            </View>
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  footer: {
    paddingVertical: theme.spacing.lg,
  },
});
