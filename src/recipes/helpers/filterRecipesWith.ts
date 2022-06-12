import { IngredientDto, RecipeDto } from '../dto';

export function filterRecipesWith(products: string[], recipes: RecipeDto[]) {
  let result = recipes;
  products.forEach(
    (product: string) =>
      (result = result.filter((recipe: RecipeDto) => {
        if (
          recipe.ingredients.filter(
            (ingredient: IngredientDto) => ingredient.name === product
          ).length > 0
        )
          return true;
      }))
  );
  return Promise.resolve(result);
}