import { IRecipeCategory } from '../../recipe-categories/models/recipe-category';

export interface IRecipe {
  id: number;
  title: string;
  description: string | undefined;
  recipeCategory: IRecipeCategory;
}
