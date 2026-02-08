/**
 * Use Case: Get Locations
 */
import {LocationEntity, PaginatedResponse} from '../entities';
import {LocationRepository} from '../repositories';

export interface GetLocationsParams {
  page: number;
  name?: string;
}

export class GetLocationsUseCase {
  constructor(private readonly locationRepository: LocationRepository) {}

  async execute(
    params: GetLocationsParams,
  ): Promise<PaginatedResponse<LocationEntity>> {
    return this.locationRepository.getLocations(params.page, params.name);
  }
}
