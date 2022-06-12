import { IRecipe } from '../../interfaces';
import { IngredientDto } from './IngredientDto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RecipeDto implements IRecipe {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  imageURL: string;
  @IsArray()
  @IsNotEmpty()
  ingredients: IngredientDto[];
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsArray()
  @IsNotEmpty()
  steps: string[];
  @IsArray()
  @IsNotEmpty()
  timers: number[];
  @IsOptional()
  @IsString()
  originalURL?: string;
}
