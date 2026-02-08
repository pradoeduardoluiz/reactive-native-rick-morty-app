/**
 * Custom Hook: useCharacters
 * Similar to Android ViewModel, manages screen state and logic
 * Uses React Query for server state management
 */
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@shared/constants';
import {useRepositories} from '../providers/RepositoryProvider';
import {GetCharactersUseCase} from '@domain/useCases';

export const useCharacters = (page: number = 1, name?: string, status?: string) => {
  const {characterRepository} = useRepositories();
  
  const getCharactersUseCase = new GetCharactersUseCase(characterRepository);

  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTERS, page, name, status],
    queryFn: () => getCharactersUseCase.execute({page, name, status}),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
