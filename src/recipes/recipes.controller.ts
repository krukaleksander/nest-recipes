import { Controller, Get } from '@nestjs/common';
import { RecipesService } from './recipes.service';

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
}
