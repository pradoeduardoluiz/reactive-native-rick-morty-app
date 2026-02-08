/**
 * Repository Implementation: CharacterRepositoryImpl
 * Similar to Android RepositoryImpl
 * Implements the domain repository interface
 */
import {Character, PaginatedResponse} from '@domain/entities';
import {CharacterRepository} from '@domain/repositories';
import {CharacterRemoteDataSource} from '../dataSources';
import {CharacterMapper} from '../mappers';

export class CharacterRepositoryImpl implements CharacterRepository {
  constructor(
    private readonly remoteDataSource: CharacterRemoteDataSource,
  ) {}

  async getCharacters(
    page: number,
    name?: string,
    status?: string,
  ): Promise<PaginatedResponse<Character>> {
    const dto = await this.remoteDataSource.getCharacters(page, name, status);
    return CharacterMapper.toPaginatedDomain(dto);
  }

  async getCharacterById(id: number): Promise<Character> {
    const dto = await this.remoteDataSource.getCharacterById(id);
    return CharacterMapper.toDomain(dto);
  }

  async getCharactersByIds(ids: number[]): Promise<Character[]> {
    const dtos = await this.remoteDataSource.getCharactersByIds(ids);
    // Handle single result vs array response
    const dtosArray = Array.isArray(dtos) ? dtos : [dtos];
    return CharacterMapper.toDomainList(dtosArray);
  }
}
