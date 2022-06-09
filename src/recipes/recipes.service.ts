import { Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { Ingredient, Recipe } from '../interfaces';

@Injectable()
export class RecipesService {
  getListOfUniqueIngredients(): string[] {
    return this.getIngredients(MockDB);
  }

  private getIngredients(MockDB: Recipe[]) {
    const db = MockDB;
    const arrOfAllIngredients: string[] = [];
    db.forEach((recipe: Recipe) => {
      const { ingredients } = recipe;
      ingredients.forEach((ingredient: Ingredient) =>
        arrOfAllIngredients.push(ingredient.name),
      );
    });
    return [...new Set(arrOfAllIngredients.flat(1))];
  }
}
