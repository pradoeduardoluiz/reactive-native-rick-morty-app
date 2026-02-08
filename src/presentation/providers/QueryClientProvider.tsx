/**
 * Query Client Provider
 * Wraps the app with React Query (TanStack Query) provider
 */
import React, {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface AppQueryClientProviderProps {
  children: ReactNode;
}

export const AppQueryClientProvider: React.FC<
  AppQueryClientProviderProps
> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
