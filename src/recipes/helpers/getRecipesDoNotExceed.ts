import { IRecipe } from '../../interfaces';
import { sumTheArray } from './sumTheArray';

export function getRecipesDoNotExceed(
  time: number,
  recipes: IRecipe[],
): IRecipe[] {
  const result = [];
  recipes.forEach((recipe: IRecipe) => {
    if (sumTheArray(recipe.timers) <= time) {
      result.push(recipe);
    }
  });
  return result;
}
