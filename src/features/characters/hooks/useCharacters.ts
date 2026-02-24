/**
 * Custom hook for fetching characters with infinite pagination
 */

import { useInfiniteQuery } from '@tanstack/react-query';

import { getCharacters } from '../services/charactersApi';

/**
 * Hook to fetch characters with infinite scroll pagination
 * Uses React Query's useInfiniteQuery for automatic caching and pagination
 *
 * @returns Object containing characters data, loading state, error, and pagination functions
 */
export function useCharacters() {
  const query = useInfiniteQuery({
    queryKey: ['characters'],
    queryFn: ({ pageParam = 1 }) => getCharacters(pageParam),
    getNextPageParam: lastPage => {
      // Extract next page number from the API info
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        const page = url.searchParams.get('page');
        return page ? parseInt(page, 10) : undefined;
      }
      return undefined;
    },
    initialPageParam: 1,
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
