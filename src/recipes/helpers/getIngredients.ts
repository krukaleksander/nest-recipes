export function getIngredients(ingredientsList, key: string) {
  const ingredients = ingredientsList;
  const arrOfAllIngredients: string[] = [];
  ingredients.forEach((ingredient) => {
    arrOfAllIngredients.push(ingredient[key]);
  });
  return [...new Set(arrOfAllIngredients.flat(1))];
}
