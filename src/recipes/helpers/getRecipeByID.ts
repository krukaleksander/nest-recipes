import { HttpException, HttpStatus } from '@nestjs/common';
import { RecipeDto } from '../dto';

export function getRecipeByID(
  recipes: RecipeDto[],
  id: number,
): RecipeDto[] | HttpException {
  if (!id || recipes.length < 1)
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  return recipes;
}
