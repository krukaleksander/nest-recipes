import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { recipeProviders } from './repos/recipe.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RecipesController],
  providers: [RecipesService, ...recipeProviders],
})
export class RecipesModule {}
