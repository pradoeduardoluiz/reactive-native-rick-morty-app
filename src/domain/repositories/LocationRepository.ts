/**
 * Repository Interface: LocationRepository
 */
import {LocationEntity, PaginatedResponse} from '../entities';

export interface LocationRepository {
  /**
   * Get paginated list of locations
   */
  getLocations(
    page: number,
    name?: string,
  ): Promise<PaginatedResponse<LocationEntity>>;

  /**
   * Get location by ID
   */
  getLocationById(id: number): Promise<LocationEntity>;

  /**
   * Get multiple locations by IDs
   */
  getLocationsByIds(ids: number[]): Promise<LocationEntity[]>;
}
