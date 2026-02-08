/**
 * Repository Implementation: EpisodeRepositoryImpl
 */
import {Episode, PaginatedResponse} from '@domain/entities';
import {EpisodeRepository} from '@domain/repositories';
import {EpisodeRemoteDataSource} from '../dataSources';
import {EpisodeMapper} from '../mappers';

export class EpisodeRepositoryImpl implements EpisodeRepository {
  constructor(private readonly remoteDataSource: EpisodeRemoteDataSource) {}

  async getEpisodes(
    page: number,
    name?: string,
  ): Promise<PaginatedResponse<Episode>> {
    const dto = await this.remoteDataSource.getEpisodes(page, name);
    return EpisodeMapper.toPaginatedDomain(dto);
  }

  async getEpisodeById(id: number): Promise<Episode> {
    const dto = await this.remoteDataSource.getEpisodeById(id);
    return EpisodeMapper.toDomain(dto);
  }

  async getEpisodesByIds(ids: number[]): Promise<Episode[]> {
    const dtos = await this.remoteDataSource.getEpisodesByIds(ids);
    const dtosArray = Array.isArray(dtos) ? dtos : [dtos];
    return EpisodeMapper.toDomainList(dtosArray);
  }
}
