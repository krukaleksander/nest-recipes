import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from '../database/entities/Recipe.entity';
import { MockDB } from './MockDB';
import { IRecipe } from '../interfaces';
@Injectable()
export class DataInitService implements OnApplicationBootstrap {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private recipeRepository: Repository<Recipe>,
  ) {}
  async onApplicationBootstrap() {
    console.log('Initialize migration...');
    try {
      await Promise.all(
        MockDB.map(async (recipe: IRecipe) => {
          await this.recipeRepository.save(recipe);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
