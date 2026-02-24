/**
 * Custom hook for searching characters by name with infinite pagination
 */

import { useInfiniteQuery } from '@tanstack/react-query';

import { searchCharacters } from '../services/charactersApi';

/**
 * Hook to search characters by name with infinite scroll pagination
 * Uses React Query's useInfiniteQuery for automatic caching and pagination
 *
 * @param name - Search term (must be non-empty to trigger the query)
 * @returns Object containing characters data, loading state, error, and pagination functions
 */
export function useSearchCharacters(name: string) {
  const query = useInfiniteQuery({
    queryKey: ['characters', 'search', name],
    queryFn: ({ pageParam = 1 }) => searchCharacters(name, pageParam),
    getNextPageParam: lastPage => {
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        const page = url.searchParams.get('page');
        return page ? parseInt(page, 10) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: name.trim().length > 0,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    refetch: query.refetch,
  };
}
