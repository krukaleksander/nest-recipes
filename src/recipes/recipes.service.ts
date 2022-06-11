import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { Repository } from 'typeorm';
import { Recipe } from '../database/entities/Recipe.entity';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';
import { getRecipes } from './helpers/getRecipes';
import { getRecipesDoNotExceed } from './helpers/getRecipesDoNotExceed';
import { getRecipeByID } from './helpers/getRecipeByID';
import { Ingredient } from '../database/entities/Ingredient.entity';

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

  getRecipesByTime(body): IRecipe[] {
    const { time } = body;
    return getRecipesDoNotExceed(time, MockDB);
  }

  getSingleRecipe(body): IRecipe[] | HttpException {
    const { id } = body;
    return getRecipeByID(id);
  }
}
