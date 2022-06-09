export interface IRecipe {
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
  type: string;
}

export interface IPagination {
  limit: string;
  page: string;
}
