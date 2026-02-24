/**
 * React Query (TanStack Query) configuration
 */

import { QueryClient } from '@tanstack/react-query';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const CACHE_TIME = 10 * 60 * 1000; // 10 minutes (gcTime in v5)

/**
 * QueryClient instance with optimized configuration
 * for Rick and Morty API data fetching
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time until data is considered stale
      staleTime: STALE_TIME,
      // Time until inactive queries are garbage collected
      gcTime: CACHE_TIME, // renamed from cacheTime in v5
      // Number of retry attempts on failure
      retry: 2,
      // Retry delay increases exponentially
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus (good for mobile apps)
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
    mutations: {
      // Number of retry attempts for mutations
      retry: 1,
    },
  },
});
