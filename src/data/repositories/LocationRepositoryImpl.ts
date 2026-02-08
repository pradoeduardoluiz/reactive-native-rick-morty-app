/**
 * Repository Implementation: LocationRepositoryImpl
 */
import {LocationEntity, PaginatedResponse} from '@domain/entities';
import {LocationRepository} from '@domain/repositories';
import {LocationRemoteDataSource} from '../dataSources';
import {LocationMapper} from '../mappers';

export class LocationRepositoryImpl implements LocationRepository {
  constructor(private readonly remoteDataSource: LocationRemoteDataSource) {}

  async getLocations(
    page: number,
    name?: string,
  ): Promise<PaginatedResponse<LocationEntity>> {
    const dto = await this.remoteDataSource.getLocations(page, name);
    return LocationMapper.toPaginatedDomain(dto);
  }

  async getLocationById(id: number): Promise<LocationEntity> {
    const dto = await this.remoteDataSource.getLocationById(id);
    return LocationMapper.toDomain(dto);
  }

  async getLocationsByIds(ids: number[]): Promise<LocationEntity[]> {
    const dtos = await this.remoteDataSource.getLocationsByIds(ids);
    const dtosArray = Array.isArray(dtos) ? dtos : [dtos];
    return LocationMapper.toDomainList(dtosArray);
  }
}
