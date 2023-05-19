import { IRecipeCategory } from './recipe-category';

export interface IRecipe {
  id: string;
  title: string;
  description: string | undefined;
  recipeCategory: IRecipeCategory;
}
