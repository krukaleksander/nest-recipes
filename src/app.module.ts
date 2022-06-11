import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { DataInitService } from './helpers/DataInit';
import { recipeProviders } from './recipes/repos/recipe.providers';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [RecipesModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DataInitService, ...recipeProviders],
})
export class AppModule {}
