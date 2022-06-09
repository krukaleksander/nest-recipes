import { Ingredient, IRecipe } from '../../interfaces';

export function getIngredients(MockDB: IRecipe[], key: string) {
  const db = MockDB;
  const arrOfAllIngredients: string[] = [];
  db.forEach((recipe: IRecipe) => {
    const { ingredients } = recipe;
    ingredients.forEach((ingredient: Ingredient) =>
      arrOfAllIngredients.push(ingredient[key]),
    );
  });
  return [...new Set(arrOfAllIngredients.flat(1))];
}
