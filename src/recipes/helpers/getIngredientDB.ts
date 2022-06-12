import { Repository } from 'typeorm';
import { Ingredient } from '../../database/entities/Ingredient.entity';

export function getIngredientDB(repository: Repository<Ingredient>) {
  try {
    return Promise.resolve(repository.find());
  } catch (error) {
    throw error;
  }
}
