import { IRecipeCategory } from './recipecategory';

export interface IRecipe {
  id: string;
  title: string;
  description: string | undefined;
  recipeCategory: IRecipeCategory;
}
