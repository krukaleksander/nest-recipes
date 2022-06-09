import { Controller, Get } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from '../interfaces';

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
  getAllRecipes(): Recipe[] {
    return this.recipesService.getAllRecipes();
  }
}
