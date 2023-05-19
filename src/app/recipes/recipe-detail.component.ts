import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './recipe.service';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { IRecipe } from './recipe';
import { IRecipeIngredient } from './recipe-ingredient';
import { PreparationStepService } from './preparation-step.service';
import { IPreparationStep } from './preparation-step';

@Component({
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: IRecipe | undefined;
  recipeIngredients: IRecipeIngredient[] = [];
  preparationSteps: IPreparationStep[] = [];
  errorMessages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientService,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipe(id);
      this.getRecipeIngredients(id);
      this.getPreparationSteps(id);
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

  getPreparationSteps(recipeId: string): void {
    this.preparationStepService.getPreparationSteps(recipeId).subscribe({
      next: (preparationSteps) => (this.preparationSteps = preparationSteps),
      error: (err) => this.errorMessages.push(err),
    });
  }
}
