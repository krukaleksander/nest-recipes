import { HttpException, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';
import { getRecipes } from './helpers/getRecipes';

@Injectable()
export class RecipesService {
  getListOfUniqueIngredients(): string[] {
    return getIngredients(MockDB, 'name');
  }

  getListOfIngredientsTypes(): string[] {
    return getIngredients(MockDB, 'type');
  }

  getAllRecipes(query: IPagination): IRecipe[] | HttpException {
    const { limit, page } = query;
    return getRecipes(limit, page, MockDB);
  }
}
