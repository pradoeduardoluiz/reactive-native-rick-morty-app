/**
 * Data Source: Location Remote Data Source
 */
import {HttpClient} from '../http';
import {LocationDto, PaginatedResponseDto} from '../models';

export class LocationRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async getLocations(
    page: number,
    name?: string,
  ): Promise<PaginatedResponseDto<LocationDto>> {
    const params = new URLSearchParams({page: page.toString()});
    if (name) params.append('name', name);

    return this.httpClient.get<PaginatedResponseDto<LocationDto>>(
      `/location?${params.toString()}`,
    );
  }

  async getLocationById(id: number): Promise<LocationDto> {
    return this.httpClient.get<LocationDto>(`/location/${id}`);
  }

  async getLocationsByIds(ids: number[]): Promise<LocationDto[]> {
    const idsParam = ids.join(',');
    return this.httpClient.get<LocationDto[]>(`/location/${idsParam}`);
  }
}
