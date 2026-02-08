/**
 * Repository Provider (Dependency Injection Container)
 * Similar to Android Hilt/Koin modules
 * Provides repository instances throughout the app
 */
import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import {
  CharacterRepository,
  EpisodeRepository,
  LocationRepository,
} from '@domain/repositories';
import {
  CharacterRepositoryImpl,
  EpisodeRepositoryImpl,
  LocationRepositoryImpl,
} from '@data/repositories';
import {
  CharacterRemoteDataSource,
  EpisodeRemoteDataSource,
  LocationRemoteDataSource,
} from '@data/dataSources';
import {AxiosHttpClient} from '@data/http';

interface RepositoryContextValue {
  characterRepository: CharacterRepository;
  episodeRepository: EpisodeRepository;
  locationRepository: LocationRepository;
}

const RepositoryContext = createContext<RepositoryContextValue | undefined>(
  undefined,
);

interface RepositoryProviderProps {
  children: ReactNode;
}

export const RepositoryProvider: React.FC<RepositoryProviderProps> = ({
  children,
}) => {
  // Singleton instances - similar to @Provides @Singleton in Hilt
  const repositories = useMemo(() => {
    // Create HTTP client
    const httpClient = new AxiosHttpClient();

    // Create data sources
    const characterDataSource = new CharacterRemoteDataSource(httpClient);
    const episodeDataSource = new EpisodeRemoteDataSource(httpClient);
    const locationDataSource = new LocationRemoteDataSource(httpClient);

    // Create repositories
    const characterRepository = new CharacterRepositoryImpl(
      characterDataSource,
    );
    const episodeRepository = new EpisodeRepositoryImpl(episodeDataSource);
    const locationRepository = new LocationRepositoryImpl(locationDataSource);

    return {
      characterRepository,
      episodeRepository,
      locationRepository,
    };
  }, []);

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

/**
 * Custom hook to access repositories
 * Similar to @Inject in Android
 */
export const useRepositories = (): RepositoryContextValue => {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error(
      'useRepositories must be used within a RepositoryProvider',
    );
  }
  return context;
};
