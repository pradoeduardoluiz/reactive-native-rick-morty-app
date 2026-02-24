/**
 * Characters API Service
 * Handles all API calls related to characters
 */

import { api } from '../../../shared/services/api';
import type { Character, CharactersResponse } from '../../../shared/types/api';

/**
 * Get paginated list of characters
 * @param page - Page number (default: 1)
 * @returns Promise with characters response
 */
export async function getCharacters(page: number = 1): Promise<CharactersResponse> {
  const response = await api.get<CharactersResponse>('/character', {
    params: { page },
  });
  return response.data;
}

/**
 * Get a single character by ID
 * @param id - Character ID
 * @returns Promise with character data
 */
export async function getCharacterById(id: number): Promise<Character> {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
}

/**
 * Search characters by name with pagination
 * @param name - Character name to search
 * @param page - Page number (default: 1)
 * @returns Promise with characters response
 */
export async function searchCharacters(
  name: string,
  page: number = 1
): Promise<CharactersResponse> {
  const response = await api.get<CharactersResponse>('/character', {
    params: { name, page },
  });
  return response.data;
}
