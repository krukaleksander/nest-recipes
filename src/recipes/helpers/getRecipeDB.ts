import { Repository } from 'typeorm';
import { Recipe } from '../../database/entities/Recipe.entity';

export function getRecipeDB(repository: Repository<Recipe>, id?: number) {
  try {
    return Promise.resolve(
      repository.find({
        relations: ['ingredients'],
        where: { id },
      }),
    );
  } catch (error) {
    throw error;
  }
}
