import { Controller, Get, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { IPagination, IRecipe } from '../interfaces';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  @Get('/ingredients')
  getListOfUniqueIngredients(): string[] {
    return this.recipesService.getListOfUniqueIngredients();
  }
  @Get('/ingredients/types')
  getListOfIngredientsTypes(): string[] {
    return this.recipesService.getListOfIngredientsTypes();
  }
  @Get('/')
  getAllRecipes(@Query() query: IPagination): IRecipe[] {
    return this.recipesService.getAllRecipes(query);
  }
}
