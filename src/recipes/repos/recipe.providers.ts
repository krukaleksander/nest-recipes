import { DataSource } from 'typeorm';
import { Recipe } from '../../database/entities/Recipe.entity';

export const recipeProviders = [
  {
    provide: 'RECIPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipe),
    inject: ['DATA_SOURCE'],
  },
];
