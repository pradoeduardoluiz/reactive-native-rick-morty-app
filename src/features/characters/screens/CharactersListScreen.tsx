/**
 * Characters List Screen
 * Displays a list of all characters from Rick and Morty with infinite scroll and search
 */

import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../theme';
import type { TabScreenProps } from '../../../navigation/types';
import { useCharacters } from '../hooks/useCharacters';
import { useSearchCharacters } from '../hooks/useSearchCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { EmptyState, ErrorState, LoadingSpinner, SearchBar } from '../../../shared/components';
import type { Character } from '../../../shared/types';

type Props = TabScreenProps<'Characters'>;

export function CharactersListScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const isSearching = searchQuery.trim().length > 0;

  // Always call both hooks; `enabled` inside useSearchCharacters handles the guard
  const browseHook = useCharacters();
  const searchHook = useSearchCharacters(searchQuery);

  // Pick active hook results based on mode
  const { data, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    isSearching ? searchHook : browseHook;

  // Flatten pages into a single character array
  const characters = data?.pages.flatMap(page => page.results) ?? [];

  // Total count label
  const totalCount: number | undefined = isSearching
    ? searchHook.data?.pages[0]?.info.count
    : browseHook.data?.pages[0]?.info.count;

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleCharacterPress = useCallback(
    (characterId: number) => {
      navigation.navigate('CharacterDetail', { characterId });
    },
    [navigation]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, []);

  // ---------------------------------------------------------------------------
  // Sub-renders
  // ---------------------------------------------------------------------------

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Characters</Text>
      {totalCount !== undefined && (
        <Text style={styles.headerSubtitle}>
          {isSearching
            ? `${totalCount} result${totalCount !== 1 ? 's' : ''} for "${searchQuery}"`
            : `${totalCount} characters`}
        </Text>
      )}
      <View style={styles.searchBarWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClear}
          placeholder="Search characters..."
        />
      </View>
    </View>
  );

  const renderFooter = () =>
    isFetchingNextPage ? (
      <View style={styles.footer}>
        <LoadingSpinner size="small" message="Loading more..." />
      </View>
    ) : null;

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <CharacterCard character={item} onPress={() => handleCharacterPress(item.id)} />
    ),
    [handleCharacterPress]
  );

  // ---------------------------------------------------------------------------
  // States: loading / error / empty
  // ---------------------------------------------------------------------------

  if (isLoading) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.centered}>
          <LoadingSpinner size="large" message="Loading characters..." />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {renderHeader()}
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

  if (characters.length === 0) {
    const emptyTitle = isSearching ? 'Nenhum resultado encontrado' : 'No Characters Found';
    const emptyMessage = isSearching
      ? `We couldn't find any characters matching "${searchQuery}". Try a different name.`
      : 'There are no characters to display.';

    return (
      <View style={styles.container}>
        {renderHeader()}
        <View style={styles.centered}>
          <EmptyState icon={isSearching ? '🔍' : '👽'} title={emptyTitle} message={emptyMessage} />
        </View>
      </View>
    );
  }

  // ---------------------------------------------------------------------------
  // Main list
  // ---------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={false}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
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
    marginBottom: theme.spacing.md,
  },
  searchBarWrapper: {
    marginTop: theme.spacing.xs,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  footer: {
    paddingVertical: theme.spacing.lg,
  },
});
