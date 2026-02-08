/**
 * Data Source: Character Remote Data Source
 * Similar to Android RemoteDataSource / API Service
 */
import {HttpClient} from '../http';
import {CharacterDto, PaginatedResponseDto} from '../models';

export class CharacterRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async getCharacters(
    page: number,
    name?: string,
    status?: string,
  ): Promise<PaginatedResponseDto<CharacterDto>> {
    const params = new URLSearchParams({page: page.toString()});
    if (name) params.append('name', name);
    if (status) params.append('status', status);

    return this.httpClient.get<PaginatedResponseDto<CharacterDto>>(
      `/character?${params.toString()}`,
    );
  }

  async getCharacterById(id: number): Promise<CharacterDto> {
    return this.httpClient.get<CharacterDto>(`/character/${id}`);
  }

  async getCharactersByIds(ids: number[]): Promise<CharacterDto[]> {
    const idsParam = ids.join(',');
    return this.httpClient.get<CharacterDto[]>(`/character/${idsParam}`);
  }
}
