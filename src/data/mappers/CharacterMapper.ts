/**
 * Mapper: CharacterDto -> Character (Domain Entity)
 * Transforms API data to domain models
 * Similar to Android data mappers
 */
import {
  Character,
  CharacterStatus,
  CharacterGender,
  Location,
  PaginatedResponse,
  PaginationInfo,
} from '@domain/entities';
import {CharacterDto, LocationDto, PaginatedResponseDto} from '../models';

export class CharacterMapper {
  /**
   * Extract ID from API URL
   * e.g., "https://rickandmortyapi.com/api/character/1" -> 1
   */
  private static extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Map LocationDto to Location
   */
  private static mapLocation(dto: LocationDto): Location {
    return {
      id: this.extractIdFromUrl(dto.url),
      name: dto.name,
      url: dto.url,
    };
  }

  /**
   * Map CharacterDto to Character
   */
  static toDomain(dto: CharacterDto): Character {
    return {
      id: dto.id,
      name: dto.name,
      status: dto.status as CharacterStatus,
      species: dto.species,
      type: dto.type,
      gender: dto.gender as CharacterGender,
      origin: this.mapLocation(dto.origin),
      location: this.mapLocation(dto.location),
      imageUrl: dto.image,
      episodeIds: dto.episode.map(url => this.extractIdFromUrl(url)),
      createdAt: new Date(dto.created),
    };
  }

  /**
   * Map array of CharacterDto to Character[]
   */
  static toDomainList(dtos: CharacterDto[]): Character[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  /**
   * Map paginated response
   */
  static toPaginatedDomain(
    dto: PaginatedResponseDto<CharacterDto>,
  ): PaginatedResponse<Character> {
    return {
      results: this.toDomainList(dto.results),
      info: this.mapPaginationInfo(dto.info),
    };
  }

  /**
   * Map pagination info
   */
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

  /**
   * Extract page number from pagination URL
   */
  private static extractPageFromUrl(url: string): number {
    const match = url.match(/[?&]page=(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }
}
