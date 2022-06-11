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
    console.log('app is starting');
    try {
      await Promise.all(
        MockDB.map(
          async (recipe: IRecipe) => await this.recipeRepository.save(recipe),
        ),
      );
      await this.recipeRepository.save(MockDB[0]);
    } catch (error) {
      throw error;
    }
  }
}
