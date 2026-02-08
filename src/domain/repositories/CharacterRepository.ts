/**
 * Repository Interface: CharacterRepository
 * Similar to Android Repository interface
 * Domain layer defines the contract, data layer implements it
 */
import {Character, PaginatedResponse} from '../entities';

export interface CharacterRepository {
  /**
   * Get paginated list of characters
   * @param page - Page number (starts from 1)
   * @param name - Optional name filter
   * @param status - Optional status filter
   */
  getCharacters(
    page: number,
    name?: string,
    status?: string,
  ): Promise<PaginatedResponse<Character>>;

  /**
   * Get character by ID
   * @param id - Character ID
   */
  getCharacterById(id: number): Promise<Character>;

  /**
   * Get multiple characters by IDs
   * @param ids - Array of character IDs
   */
  getCharactersByIds(ids: number[]): Promise<Character[]>;
}
