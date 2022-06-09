import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';

function chunkArray(arr: IRecipe[], chunkSize: number) {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}

function getRecipes(
  limit: string,
  page: string,
  database: IRecipe[],
): IRecipe[] | HttpException {
  const limitNumber = +limit;
  const pageNumber = +page;
  const isPageInRange = database.length / limitNumber > pageNumber - 1;
  if (!limit && !page) return database;
  if (limitNumber > database.length)
    throw new HttpException('limit out of range', HttpStatus.BAD_REQUEST);
  if (limit && !page) return database.slice(0, limitNumber);
  if (limit && page && !isPageInRange)
    throw new HttpException('page out of range', HttpStatus.BAD_REQUEST);
  if (limit && page && isPageInRange) {
    return chunkArray(database, +limit)[+page - 1];
  }
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
