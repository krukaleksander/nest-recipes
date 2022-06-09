import { Injectable } from '@nestjs/common';
import { MockDB } from '../helpers/MockDB';
import { getIngredients } from './helpers/getIngredients';

@Injectable()
export class RecipesService {
  getListOfUniqueIngredients(): string[] {
    return getIngredients(MockDB, 'name');
  }

  getListOfIngredientsTypes(): string[] {
    return getIngredients(MockDB, 'type');
  }
}
