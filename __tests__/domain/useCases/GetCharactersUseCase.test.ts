/**
 * Test: GetCharactersUseCase
 * Unit test for use case logic
 */
import {GetCharactersUseCase} from '@domain/useCases';
import {CharacterRepository} from '@domain/repositories';
import {Character, CharacterStatus, CharacterGender, PaginatedResponse} from '@domain/entities';

describe('GetCharactersUseCase', () => {
  let useCase: GetCharactersUseCase;
  let mockRepository: jest.Mocked<CharacterRepository>;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: CharacterStatus.ALIVE,
    species: 'Human',
    type: '',
    gender: CharacterGender.MALE,
    origin: {id: 1, name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1'},
    location: {id: 20, name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20'},
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episodeIds: [1, 2, 3],
    createdAt: new Date('2017-11-04T18:48:46.250Z'),
  };

  const mockPaginatedResponse: PaginatedResponse<Character> = {
    results: [mockCharacter],
    info: {
      count: 1,
      pages: 1,
      next: null,
      prev: null,
    },
  };

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getCharacterById: jest.fn(),
      getCharactersByIds: jest.fn(),
    } as jest.Mocked<CharacterRepository>;

    useCase = new GetCharactersUseCase(mockRepository);
  });

  it('should call repository with correct parameters', async () => {
    mockRepository.getCharacters.mockResolvedValue(mockPaginatedResponse);

    const params = {page: 1, name: 'Rick', status: 'alive'};
    const result = await useCase.execute(params);

    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1, 'Rick', 'alive');
    expect(result).toEqual(mockPaginatedResponse);
  });

  it('should work without optional parameters', async () => {
    mockRepository.getCharacters.mockResolvedValue(mockPaginatedResponse);

    const params = {page: 1};
    await useCase.execute(params);

    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1, undefined, undefined);
  });

  it('should propagate repository errors', async () => {
    const error = new Error('Network error');
    mockRepository.getCharacters.mockRejectedValue(error);

    const params = {page: 1};
    await expect(useCase.execute(params)).rejects.toThrow('Network error');
  });
});
