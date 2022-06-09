import { Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';

function getRecipes(limit, page, database) {
  if (!limit && !page) return database;
  if (limit && !page) return database.slice(0, +limit);
}

@Injectable()
export class RecipesService {
  getListOfUniqueIngredients(): string[] {
    return getIngredients(MockDB, 'name');
  }

  getListOfIngredientsTypes(): string[] {
    return getIngredients(MockDB, 'type');
  }

  getAllRecipes(query: IPagination): IRecipe[] {
    const { limit, page } = query;
    return getRecipes(limit, page, MockDB);
  }
}
