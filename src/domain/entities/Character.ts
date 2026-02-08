/**
 * Domain Entity: Character
 * Pure business model (no framework dependencies)
 * Similar to Android domain model / data class
 */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  imageUrl: string;
  episodeIds: number[];
  createdAt: Date;
}

export enum CharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export enum CharacterGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export interface Location {
  id: number;
  name: string;
  url: string;
}
