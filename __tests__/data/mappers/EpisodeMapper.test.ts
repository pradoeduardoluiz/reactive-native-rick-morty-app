/**
 * Test: EpisodeMapper
 */
import {EpisodeMapper} from '@data/mappers';
import {EpisodeDto} from '@data/models';

describe('EpisodeMapper', () => {
  const mockEpisodeDto: EpisodeDto = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2',
    ],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z',
  };

  describe('toDomain', () => {
    it('should map EpisodeDto to Episode domain entity', () => {
      const result = EpisodeMapper.toDomain(mockEpisodeDto);

      expect(result).toEqual({
        id: 1,
        name: 'Pilot',
        airDate: 'December 2, 2013',
        episode: 'S01E01',
        characterIds: [1, 2],
        createdAt: new Date('2017-11-10T12:56:33.798Z'),
      });
    });

    it('should extract character IDs from URLs', () => {
      const result = EpisodeMapper.toDomain(mockEpisodeDto);
      expect(result.characterIds).toEqual([1, 2]);
    });
  });

  describe('toDomainList', () => {
    it('should map array of EpisodeDto to Episode[]', () => {
      const dtos = [mockEpisodeDto, {...mockEpisodeDto, id: 2, name: 'Lawnmower Dog'}];
      const result = EpisodeMapper.toDomainList(dtos);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });
  });
});
