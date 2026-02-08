/**
 * Mapper: EpisodeDto -> Episode
 */
import {Episode, PaginatedResponse, PaginationInfo} from '@domain/entities';
import {EpisodeDto, PaginatedResponseDto} from '../models';

export class EpisodeMapper {
  private static extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  }

  static toDomain(dto: EpisodeDto): Episode {
    return {
      id: dto.id,
      name: dto.name,
      airDate: dto.air_date,
      episode: dto.episode,
      characterIds: dto.characters.map(url => this.extractIdFromUrl(url)),
      createdAt: new Date(dto.created),
    };
  }

  static toDomainList(dtos: EpisodeDto[]): Episode[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  static toPaginatedDomain(
    dto: PaginatedResponseDto<EpisodeDto>,
  ): PaginatedResponse<Episode> {
    return {
      results: this.toDomainList(dto.results),
      info: this.mapPaginationInfo(dto.info),
    };
  }

  private static mapPaginationInfo(dto: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  }): PaginationInfo {
    return {
      count: dto.count,
      pages: dto.pages,
      next: dto.next ? this.extractPageFromUrl(dto.next) : null,
      prev: dto.prev ? this.extractPageFromUrl(dto.prev) : null,
    };
  }

  private static extractPageFromUrl(url: string): number {
    const match = url.match(/[?&]page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }
}
