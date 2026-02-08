/**
 * Test: CharacterMapper
 * Unit test for data mapping
 */
import {CharacterMapper} from '@data/mappers';
import {CharacterDto, PaginatedResponseDto} from '@data/models';
import {CharacterStatus, CharacterGender} from '@domain/entities';

describe('CharacterMapper', () => {
  const mockCharacterDto: CharacterDto = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2',
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  };

  describe('toDomain', () => {
    it('should map CharacterDto to Character domain entity', () => {
      const result = CharacterMapper.toDomain(mockCharacterDto);

      expect(result).toEqual({
        id: 1,
        name: 'Rick Sanchez',
        status: CharacterStatus.ALIVE,
        species: 'Human',
        type: '',
        gender: CharacterGender.MALE,
        origin: {
          id: 1,
          name: 'Earth (C-137)',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          id: 3,
          name: 'Citadel of Ricks',
          url: 'https://rickandmortyapi.com/api/location/3',
        },
        imageUrl: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episodeIds: [1, 2],
        createdAt: new Date('2017-11-04T18:48:46.250Z'),
      });
    });

    it('should extract episode IDs from URLs', () => {
      const result = CharacterMapper.toDomain(mockCharacterDto);
      expect(result.episodeIds).toEqual([1, 2]);
    });

    it('should extract location IDs from URLs', () => {
      const result = CharacterMapper.toDomain(mockCharacterDto);
      expect(result.origin.id).toBe(1);
      expect(result.location.id).toBe(3);
    });
  });

  describe('toDomainList', () => {
    it('should map array of CharacterDto to Character[]', () => {
      const dtos = [mockCharacterDto, {...mockCharacterDto, id: 2, name: 'Morty Smith'}];
      const result = CharacterMapper.toDomainList(dtos);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[1].name).toBe('Morty Smith');
    });

    it('should return empty array for empty input', () => {
      const result = CharacterMapper.toDomainList([]);
      expect(result).toEqual([]);
    });
  });

  describe('toPaginatedDomain', () => {
    it('should map paginated response correctly', () => {
      const paginatedDto: PaginatedResponseDto<CharacterDto> = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=2',
          prev: null,
        },
        results: [mockCharacterDto],
      };

      const result = CharacterMapper.toPaginatedDomain(paginatedDto);

      expect(result.info).toEqual({
        count: 826,
        pages: 42,
        next: 2,
        prev: null,
      });
      expect(result.results).toHaveLength(1);
      expect(result.results[0].id).toBe(1);
    });

    it('should extract page numbers from pagination URLs', () => {
      const paginatedDto: PaginatedResponseDto<CharacterDto> = {
        info: {
          count: 826,
          pages: 42,
          next: 'https://rickandmortyapi.com/api/character?page=3',
          prev: 'https://rickandmortyapi.com/api/character?page=1',
        },
        results: [],
      };

      const result = CharacterMapper.toPaginatedDomain(paginatedDto);

      expect(result.info.next).toBe(3);
      expect(result.info.prev).toBe(1);
    });
  });
});
