import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from '../database/entities/Recipe.entity';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';
import { getRecipes } from './helpers/getRecipes';
import { getRecipesDoNotExceed } from './helpers/getRecipesDoNotExceed';
import { getRecipeByID } from './helpers/getRecipeByID';
import { Ingredient } from '../database/entities/Ingredient.entity';
import { IngredientDto, RecipeDto } from './dto';

function filterRecipesWith(products: string[], recipes: RecipeDto[]) {
  let result = recipes;
  products.forEach(
    (product: string) =>
      (result = result.filter((recipe: RecipeDto) => {
        if (
          recipe.ingredients.filter(
            (ingredient: IngredientDto) => ingredient.name === product,
          ).length > 0
        )
          return true;
      })),
  );
  return Promise.resolve(result);
}

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientRepository: Repository<Ingredient>,
  ) {}
  async getListOfUniqueIngredients(): Promise<string[]> {
    let ingredients;
    try {
      ingredients = await this.ingredientRepository.find();
    } catch (error) {
      throw error;
    }
    return getIngredients(ingredients, 'name');
  }

  async getListOfIngredientsTypes(): Promise<string[]> {
    let ingredients;
    try {
      ingredients = await this.ingredientRepository.find();
    } catch (error) {
      throw error;
    }
    return getIngredients(ingredients, 'type');
  }

  async getAllRecipes(query: IPagination): Promise<IRecipe[] | HttpException> {
    const { limit, page } = query;
    let recipes;
    try {
      recipes = await this.recipeRepository.find({
        relations: ['ingredients'],
      });
    } catch (error) {
      throw error;
    }
    return getRecipes(limit, page, recipes);
  }

  async getRecipesByTime(body): Promise<IRecipe[]> {
    const { time } = body;
    let recipes;
    try {
      recipes = await this.recipeRepository.find({
        relations: ['ingredients'],
      });
    } catch (error) {
      throw error;
    }
    return getRecipesDoNotExceed(time, recipes);
  }

  async getSingleRecipe(body): Promise<IRecipe[] | HttpException> {
    const { id } = body;
    let recipes;
    try {
      recipes = await this.recipeRepository.find({
        relations: ['ingredients'],
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
    return getRecipeByID(recipes, id);
  }

  async getRecipesByProduct(body) {
    const { products } = body;
    let recipes: RecipeDto[];
    try {
      recipes = await this.recipeRepository.find({
        relations: ['ingredients'],
      });
    } catch (error) {
      throw error;
    }
    return filterRecipesWith(products, recipes);
  }
}
