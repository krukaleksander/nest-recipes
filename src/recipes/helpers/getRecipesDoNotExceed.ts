import { IRecipe } from '../../interfaces';
import { sumTheArray } from './sumTheArray';
import { RecipeDto } from '../dto';

export function getRecipesDoNotExceed(
  time: number,
  recipes: RecipeDto[],
): RecipeDto[] {
  const result = [];
  recipes.forEach((recipe: IRecipe) => {
    if (sumTheArray(recipe.timers) <= time) {
      result.push(recipe);
    }
  });
  return result;
}
