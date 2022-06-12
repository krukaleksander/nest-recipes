import { IRecipe } from '../../interfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

export function getRecipeByID(recipes, id: number): IRecipe[] | HttpException {
  if (!id || recipes.length < 1)
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  return recipes;
}
