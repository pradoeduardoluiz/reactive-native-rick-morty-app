/**
 * Test: GetCharacterByIdUseCase
 */
import {GetCharacterByIdUseCase} from '@domain/useCases';
import {CharacterRepository} from '@domain/repositories';
import {Character, CharacterStatus, CharacterGender} from '@domain/entities';

describe('GetCharacterByIdUseCase', () => {
  let useCase: GetCharacterByIdUseCase;
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

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getCharacterById: jest.fn(),
      getCharactersByIds: jest.fn(),
    } as jest.Mocked<CharacterRepository>;

    useCase = new GetCharacterByIdUseCase(mockRepository);
  });

  it('should return character for valid ID', async () => {
    mockRepository.getCharacterById.mockResolvedValue(mockCharacter);

    const result = await useCase.execute(1);

    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCharacter);
  });

  it('should throw error for invalid ID (zero)', async () => {
    await expect(useCase.execute(0)).rejects.toThrow('Invalid character ID');
    expect(mockRepository.getCharacterById).not.toHaveBeenCalled();
  });

  it('should throw error for invalid ID (negative)', async () => {
    await expect(useCase.execute(-1)).rejects.toThrow('Invalid character ID');
    expect(mockRepository.getCharacterById).not.toHaveBeenCalled();
  });

  it('should propagate repository errors', async () => {
    const error = new Error('Character not found');
    mockRepository.getCharacterById.mockRejectedValue(error);

    await expect(useCase.execute(999)).rejects.toThrow('Character not found');
  });
});
