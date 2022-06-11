import { IRecipe } from '../../interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MockDB } from '../../helpers/MockDB';

export function getRecipeByID(id: number): IRecipe[] | HttpException {
  const result = [];
  if (result.length < 1)
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  return result;
}
