import { IRecipeCategory } from '../recipe-categories/recipe-category';

export interface IRecipe {
  id: string;
  title: string;
  description: string | undefined;
  recipeCategory: IRecipeCategory;
}
