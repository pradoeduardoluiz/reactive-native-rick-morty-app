/**
 * Mapper: LocationDto -> LocationEntity
 */
import {
  LocationEntity,
  PaginatedResponse,
  PaginationInfo,
} from '@domain/entities';
import {LocationDto, PaginatedResponseDto} from '../models';

export class LocationMapper {
  private static extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  }

  static toDomain(dto: LocationDto): LocationEntity {
    return {
      id: dto.id,
      name: dto.name,
      type: dto.type,
      dimension: dto.dimension,
      residentIds: dto.residents.map(url => this.extractIdFromUrl(url)),
      createdAt: new Date(dto.created),
    };
  }

  static toDomainList(dtos: LocationDto[]): LocationEntity[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  static toPaginatedDomain(
    dto: PaginatedResponseDto<LocationDto>,
  ): PaginatedResponse<LocationEntity> {
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
