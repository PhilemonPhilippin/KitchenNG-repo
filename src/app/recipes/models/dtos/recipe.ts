import { IRecipeCategory } from './recipe-category';

export interface IRecipe {
  id: number;
  title: string;
  description: string | undefined;
  recipeCategory: IRecipeCategory;
}
