import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeIngredientService } from '../recipe-ingredients/recipe-ingredient.service';
import { IRecipe } from '../recipe/recipe';
import { IRecipeIngredient } from '../recipe-ingredients/recipe-ingredient';

@Component({
  selector: 'recipe-ingredient-list',
  templateUrl: './recipe-ingredient-list.component.html',
})
export class RecipeIngredientListComponent implements OnInit {
  recipe: IRecipe | undefined;
  recipeIngredients: IRecipeIngredient[] = [];
  errorMessages: string[] = [];
  displayAddIngredient: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipe(id);
      this.getRecipeIngredients(id);
    }
  }

  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => (this.recipe = recipe),
      error: (err) => this.errorMessages.push(err),
    });
  }

  getRecipeIngredients(recipeId: string): void {
    this.recipeIngredientService.getRecipeIngredients(recipeId).subscribe({
      next: (recipeIngredients) => (this.recipeIngredients = recipeIngredients),
      error: (err) => this.errorMessages.push(err),
    });
  }

  toggleAddIngredient(): void {
    this.displayAddIngredient = !this.displayAddIngredient;
  }
}