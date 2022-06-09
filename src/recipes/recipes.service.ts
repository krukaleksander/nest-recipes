import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';
import { getRecipes } from './helpers/getRecipes';

function sumTheArray(arr: number[]): number {
  return arr.reduce(
    (previousValue, currentValue) => (currentValue += previousValue),
    0,
  );
}

function getRecipesDoNotExceed(time: number, recipes: IRecipe[]): IRecipe[] {
  const result = [];
  recipes.forEach((recipe: IRecipe) => {
    if (sumTheArray(recipe.timers) <= time) {
      result.push(recipe);
    }
  });
  return result;
}

function getRecipeByID(id: number): IRecipe[] | HttpException {
  const result = MockDB.filter((recipe: IRecipe) => recipe.id === id);
  if (result.length < 1)
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  return result;
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

  getRecipesByTime(body): IRecipe[] {
    const { time } = body;
    return getRecipesDoNotExceed(time, MockDB);
  }

  getSingleRecipe(body): IRecipe[] | HttpException {
    const { id } = body;
    return getRecipeByID(id);
  }
}
