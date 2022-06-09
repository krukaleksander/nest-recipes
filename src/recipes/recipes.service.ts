import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';

function getRecipes(
  limit: string,
  page: string,
  database: IRecipe[],
): IRecipe[] | HttpException {
  const limitNumber = +limit;
  const pageNumber = +page;
  const isPageInRange = limitNumber / database.length > pageNumber - 1;
  if (!limit && !page) return database;
  if (limitNumber > database.length)
    throw new HttpException('limit out of range', HttpStatus.BAD_REQUEST);
  if (limit && !page) return database.slice(0, limitNumber);
  if (limit && page && !isPageInRange)
    throw new HttpException('page out of range', HttpStatus.BAD_REQUEST);
}

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
