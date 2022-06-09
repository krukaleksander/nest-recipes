import { Ingredient, Recipe } from '../../interfaces';

export function getIngredients(MockDB: Recipe[]) {
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
