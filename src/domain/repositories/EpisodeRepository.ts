/**
 * Repository Interface: EpisodeRepository
 */
import {Episode, PaginatedResponse} from '../entities';

export interface EpisodeRepository {
  /**
   * Get paginated list of episodes
   */
  getEpisodes(page: number, name?: string): Promise<PaginatedResponse<Episode>>;

  /**
   * Get episode by ID
   */
  getEpisodeById(id: number): Promise<Episode>;

  /**
   * Get multiple episodes by IDs
   */
  getEpisodesByIds(ids: number[]): Promise<Episode[]>;
}
