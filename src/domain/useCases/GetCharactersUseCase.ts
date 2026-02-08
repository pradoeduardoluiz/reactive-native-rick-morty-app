/**
 * Use Case: Get Characters
 * Similar to Android Interactor/Use Case
 * Contains business logic and orchestrates data flow
 */
import {Character, PaginatedResponse} from '../entities';
import {CharacterRepository} from '../repositories';

export interface GetCharactersParams {
  page: number;
  name?: string;
  status?: string;
}

export class GetCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(
    params: GetCharactersParams,
  ): Promise<PaginatedResponse<Character>> {
    // Business logic can be added here
    // e.g., validation, caching, transformation
    return this.characterRepository.getCharacters(
      params.page,
      params.name,
      params.status,
    );
  }
}
