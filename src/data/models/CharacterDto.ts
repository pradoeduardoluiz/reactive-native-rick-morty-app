/**
 * Data Model (DTO): Character API Response
 * Represents the raw API response structure
 * Similar to Android API model / network DTO
 */
export interface CharacterDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationDto;
  location: LocationDto;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface LocationDto {
  name: string;
  url: string;
}

export interface PaginatedResponseDto<T> {
  info: PaginationInfoDto;
  results: T[];
}

export interface PaginationInfoDto {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
