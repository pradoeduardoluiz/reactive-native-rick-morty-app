/**
 * Custom hook for fetching a single character by ID
 */

import { useQuery } from '@tanstack/react-query';

import { getCharacterById } from '../services/charactersApi';

/**
 * Hook to fetch a single character by ID
 * Uses React Query's useQuery for automatic caching
 *
 * @param characterId - The character's numeric ID
 * @returns Object containing character data, loading state, and error
 */
export function useCharacter(characterId: number) {
  const query = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => getCharacterById(characterId),
    enabled: !!characterId,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
