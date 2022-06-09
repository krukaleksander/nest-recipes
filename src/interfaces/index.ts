export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  steps: string[];
  timers: number[];
  imageURL: string;
  originalURL?: string;
}

export interface Ingredient {
  quantity: string;
  name: string;
  type: DishType;
}

export enum DishType {
  Baking = 'Baking',
  Condiments = 'Condiments',
  Dairy = 'Dairy',
  Drinks = 'Drinks',
  Meat = 'Meat',
  Misc = 'Misc',
  Produce = 'Produce',
}
