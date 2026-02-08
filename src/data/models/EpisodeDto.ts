/**
 * Data Model (DTO): Episode API Response
 */
export interface EpisodeDto {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
