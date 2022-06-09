import { IRecipe } from '../../interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MockDB } from '../../helpers/MockDB';

export function getRecipeByID(id: number): IRecipe[] | HttpException {
  const result = MockDB.filter((recipe: IRecipe) => recipe.id === id);
  if (result.length < 1)
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  return result;
}
