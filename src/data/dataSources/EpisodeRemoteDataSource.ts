/**
 * Data Source: Episode Remote Data Source
 */
import {HttpClient} from '../http';
import {EpisodeDto, PaginatedResponseDto} from '../models';

export class EpisodeRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async getEpisodes(
    page: number,
    name?: string,
  ): Promise<PaginatedResponseDto<EpisodeDto>> {
    const params = new URLSearchParams({page: page.toString()});
    if (name) params.append('name', name);

    return this.httpClient.get<PaginatedResponseDto<EpisodeDto>>(
      `/episode?${params.toString()}`,
    );
  }

  async getEpisodeById(id: number): Promise<EpisodeDto> {
    return this.httpClient.get<EpisodeDto>(`/episode/${id}`);
  }

  async getEpisodesByIds(ids: number[]): Promise<EpisodeDto[]> {
    const idsParam = ids.join(',');
    return this.httpClient.get<EpisodeDto[]>(`/episode/${idsParam}`);
  }
}
