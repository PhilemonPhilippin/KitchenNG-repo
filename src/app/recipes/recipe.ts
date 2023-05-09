import { IRecipeCategory } from '../recipecategories/recipecategory';

export interface IRecipe {
  id: string;
  title: string;
  description: string | undefined;
  recipeCategory: IRecipeCategory;
}
