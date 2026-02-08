/**
 * Custom Hook: useCharacterDetail
 */
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@shared/constants';
import {useRepositories} from '../providers/RepositoryProvider';
import {GetCharacterByIdUseCase} from '@domain/useCases';

export const useCharacterDetail = (id: number) => {
  const {characterRepository} = useRepositories();
  
  const getCharacterByIdUseCase = new GetCharacterByIdUseCase(characterRepository);

  return useQuery({
    queryKey: [QUERY_KEYS.CHARACTER_DETAIL, id],
    queryFn: () => getCharacterByIdUseCase.execute(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: id > 0,
  });
};
