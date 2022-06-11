import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { Repository } from 'typeorm';
import { Recipe } from '../database/entities/Recipe.entity';
import { getIngredients } from './helpers/getIngredients';
import { IPagination, IRecipe } from '../interfaces';
import { getRecipes } from './helpers/getRecipes';
import { getRecipesDoNotExceed } from './helpers/getRecipesDoNotExceed';
import { getRecipeByID } from './helpers/getRecipeByID';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
  ) {}
  getListOfUniqueIngredients(): string[] {
    return getIngredients(MockDB, 'name');
  }

  getListOfIngredientsTypes(): string[] {
    return getIngredients(MockDB, 'type');
  }

  async getAllRecipes(query: IPagination): Promise<IRecipe[] | HttpException> {
    const { limit, page } = query;
    let db;
    try {
      db = await this.recipeRepository.find({ relations: ['ingredients'] });
    } catch (error) {
      throw error;
    }
    return getRecipes(limit, page, db);
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
