/**
 * Custom Hook: useEpisodes
 */
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@shared/constants';
import {useRepositories} from '../providers/RepositoryProvider';
import {GetEpisodesUseCase} from '@domain/useCases';

export const useEpisodes = (page: number = 1, name?: string) => {
  const {episodeRepository} = useRepositories();
  
  const getEpisodesUseCase = new GetEpisodesUseCase(episodeRepository);

  return useQuery({
    queryKey: [QUERY_KEYS.EPISODES, page, name],
    queryFn: () => getEpisodesUseCase.execute({page, name}),
    staleTime: 5 * 60 * 1000,
  });
};
