/**
 * Use Case: Get Character By Id
 */
import {Character} from '../entities';
import {CharacterRepository} from '../repositories';

export class GetCharacterByIdUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: number): Promise<Character> {
    if (id <= 0) {
      throw new Error('Invalid character ID');
    }
    return this.characterRepository.getCharacterById(id);
  }
}
