/**
 * Custom Hook: useLocations
 */
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@shared/constants';
import {useRepositories} from '../providers/RepositoryProvider';
import {GetLocationsUseCase} from '@domain/useCases';

export const useLocations = (page: number = 1, name?: string) => {
  const {locationRepository} = useRepositories();
  
  const getLocationsUseCase = new GetLocationsUseCase(locationRepository);

  return useQuery({
    queryKey: [QUERY_KEYS.LOCATIONS, page, name],
    queryFn: () => getLocationsUseCase.execute({page, name}),
    staleTime: 5 * 60 * 1000,
  });
};
