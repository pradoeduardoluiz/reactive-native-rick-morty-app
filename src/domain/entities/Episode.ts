/**
 * Domain Entity: Episode
 */
export interface Episode {
  id: number;
  name: string;
  airDate: string;
  episode: string; // e.g., "S01E01"
  characterIds: number[];
  createdAt: Date;
}
