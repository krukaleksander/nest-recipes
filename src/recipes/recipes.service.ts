import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';

function getRecipes(limit, page, database) {
  const limitNumber = +limit;
  if (!limit && !page) return database;
  if (limitNumber > database.length)
    throw new HttpException('limit out of range', HttpStatus.BAD_REQUEST);
  if (limit && !page) return database.slice(0, limitNumber);
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
