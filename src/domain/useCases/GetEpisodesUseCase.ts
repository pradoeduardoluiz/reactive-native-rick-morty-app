/**
 * Use Case: Get Episodes
 */
import {Episode, PaginatedResponse} from '../entities';
import {EpisodeRepository} from '../repositories';

export interface GetEpisodesParams {
  page: number;
  name?: string;
}

export class GetEpisodesUseCase {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  async execute(params: GetEpisodesParams): Promise<PaginatedResponse<Episode>> {
    return this.episodeRepository.getEpisodes(params.page, params.name);
  }
}
