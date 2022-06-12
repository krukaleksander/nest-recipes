import { Body, Controller, Get, HttpException, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { IPagination } from '../interfaces';
import { RecipeDto } from './dto';

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
  ): Promise<RecipeDto[] | HttpException> {
    return this.recipesService.getAllRecipes(query);
  }
  @Get('/time')
  getRecipesByTime(@Body() body): Promise<RecipeDto[]> {
    return this.recipesService.getRecipesByTime(body);
  }
  @Get('/single')
  getSingleRecipe(@Body() body): Promise<RecipeDto[] | HttpException> {
    return this.recipesService.getSingleRecipe(body);
  }
  @Get('/byproduct')
  getRecipesByProduct(@Body() body): Promise<RecipeDto[] | HttpException> {
    return this.recipesService.getRecipesByProduct(body);
  }
}
