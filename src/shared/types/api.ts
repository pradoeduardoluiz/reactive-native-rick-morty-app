/**
 * TypeScript types for Rick and Morty API
 * Based on: https://rickandmortyapi.com/documentation
 */

/**
 * Character status types
 */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

/**
 * Character gender types
 */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

/**
 * Resource base type with name and URL
 */
export interface ResourceBase {
  name: string;
  url: string;
}

/**
 * Character entity from the API
 */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: ResourceBase;
  location: ResourceBase;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**
 * Location entity from the API
 */
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

/**
 * Episode entity from the API
 */
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

/**
 * API pagination info
 */
export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

/**
 * Generic API response with pagination
 */
export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

/**
 * Type aliases for common API responses
 */
export type CharactersResponse = ApiResponse<Character>;
export type LocationsResponse = ApiResponse<Location>;
export type EpisodesResponse = ApiResponse<Episode>;

/**
 * Query parameters for filtering characters
 */
export interface CharacterFilter {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
  page?: number;
}

/**
 * Query parameters for filtering locations
 */
export interface LocationFilter {
  name?: string;
  type?: string;
  dimension?: string;
  page?: number;
}

/**
 * Query parameters for filtering episodes
 */
export interface EpisodeFilter {
  name?: string;
  episode?: string;
  page?: number;
}
