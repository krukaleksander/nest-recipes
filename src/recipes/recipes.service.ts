import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from '../database/entities/Recipe.entity';
import { getIngredients } from './helpers/getIngredients';
import { IPagination } from '../interfaces';
import { getRecipes } from './helpers/getRecipes';
import { getRecipesDoNotExceed } from './helpers/getRecipesDoNotExceed';
import { getRecipeByID } from './helpers/getRecipeByID';
import { Ingredient } from '../database/entities/Ingredient.entity';
import { RecipeDto } from './dto';
import { filterRecipesWith } from './helpers/filterRecipesWith';
import { getRecipeDB } from './helpers/getRecipeDB';
import { getIngredientDB } from './helpers/getIngredientDB';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
    @Inject('INGREDIENT_REPOSITORY')
    private ingredientRepository: Repository<Ingredient>,
  ) {}
  async getListOfUniqueIngredients(): Promise<string[]> {
    const ingredients = await getIngredientDB(this.ingredientRepository);
    return getIngredients(ingredients, 'name');
  }

  async getListOfIngredientsTypes(): Promise<string[]> {
    const ingredients = await getIngredientDB(this.ingredientRepository);
    return getIngredients(ingredients, 'type');
  }

  async getAllRecipes(
    query: IPagination,
  ): Promise<RecipeDto[] | HttpException> {
    const { limit, page } = query;
    const recipes = await getRecipeDB(this.recipeRepository);
    return getRecipes(limit, page, recipes);
  }

  async getRecipesByTime(body): Promise<RecipeDto[]> {
    const { time } = body;
    const recipes = await getRecipeDB(this.recipeRepository);
    return getRecipesDoNotExceed(time, recipes);
  }

  async getSingleRecipe(body): Promise<RecipeDto[] | HttpException> {
    const { id } = body;
    const recipes = await getRecipeDB(this.recipeRepository, id);
    return getRecipeByID(recipes, id);
  }

  async getRecipesByProduct(body) {
    const { products } = body;
    const recipes = await getRecipeDB(this.recipeRepository);
    return filterRecipesWith(products, recipes);
  }
}
