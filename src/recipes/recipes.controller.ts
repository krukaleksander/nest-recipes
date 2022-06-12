import { Body, Controller, Get, HttpException, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { IPagination, IRecipe } from '../interfaces';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  @Get('/ingredients')
  getListOfUniqueIngredients(): Promise<string[]> {
    return this.recipesService.getListOfUniqueIngredients();
  }
  @Get('/ingredients/types')
  getListOfIngredientsTypes(): Promise<string[]> {
    return this.recipesService.getListOfIngredientsTypes();
  }
  @Get('/')
  getAllRecipes(
    @Query() query: IPagination,
  ): Promise<IRecipe[] | HttpException> {
    return this.recipesService.getAllRecipes(query);
  }
  @Get('/time')
  getRecipesByTime(@Body() body): Promise<IRecipe[]> {
    return this.recipesService.getRecipesByTime(body);
  }
  @Get('/single')
  getSingleRecipe(@Body() body): Promise<IRecipe[] | HttpException> {
    return this.recipesService.getSingleRecipe(body);
  }
}
