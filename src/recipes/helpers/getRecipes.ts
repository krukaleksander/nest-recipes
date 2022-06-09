import { IRecipe } from '../../interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';
import { chunkArray } from './chunkArray';

export function getRecipes(
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
