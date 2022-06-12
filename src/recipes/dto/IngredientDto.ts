import { Ingredient } from '../../interfaces';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class IngredientDto implements Ingredient {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  quantity: string;
  @IsString()
  @IsNotEmpty()
  type: string;
}
