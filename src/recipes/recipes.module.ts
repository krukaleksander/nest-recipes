import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { recipeProviders } from './repos/recipe.providers';
import { DatabaseModule } from '../database/database.module';
import { ingredientProviders } from './repos/ingredient.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipesController],
  providers: [RecipesService, ...recipeProviders, ...ingredientProviders],
})
export class RecipesModule {}
