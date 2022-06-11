import { DataSource } from 'typeorm';
import { Ingredient } from '../../database/entities/Ingredient.entity';

export const ingredientProviders = [
  {
    provide: 'INGREDIENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Ingredient),
    inject: ['DATA_SOURCE'],
  },
];
