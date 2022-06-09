import { Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';
import { Ingredient, Recipe } from '../interfaces';

function getIngredientsTypes(MockDB: Recipe[]) {
  const db = MockDB;
  const arrOfAllIngredientsTypes: string[] = [];
  db.forEach((recipe: Recipe) => {
    const { ingredients } = recipe;
    ingredients.forEach((ingredient: Ingredient) =>
      arrOfAllIngredientsTypes.push(ingredient.type),
    );
  });
  return [...new Set(arrOfAllIngredientsTypes.flat(1))];
}

@Injectable()
export class RecipesService {
  getListOfUniqueIngredients(): string[] {
    return getIngredients(MockDB);
  }

  getListOfIngredientsTypes(): string[] {
    return getIngredientsTypes(MockDB);
  }
}
