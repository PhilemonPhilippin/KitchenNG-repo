import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeIngredientService } from '../recipe-ingredients/recipe-ingredient.service';
import { IRecipe } from '../recipe/recipe';
import { IRecipeIngredient } from '../recipe-ingredients/recipe-ingredient';
import { PreparationStepService } from '../preparation-steps/preparation-step.service';
import { IPreparationStep } from '../preparation-steps/preparation-step';

@Component({
  selector: 'recipe-preparation-step-list',
  templateUrl: './recipe-preparation-step-list.component.html',
})
export class RecipePreparationStepListComponent implements OnInit {
  recipe: IRecipe | undefined;
  recipeIngredients: IRecipeIngredient[] = [];
  preparationSteps: IPreparationStep[] = [];
  errorMessages: string[] = [];
  displayAddPreparationStep: boolean = false;

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
      this.getPreparationSteps(id);
    }
  }

  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => (this.recipe = recipe),
      error: (err) => this.errorMessages.push(err),
    });
  }
  getPreparationSteps(recipeId: string): void {
    this.preparationStepService.getPreparationSteps(recipeId).subscribe({
      next: (preparationSteps) => (this.preparationSteps = preparationSteps),
      error: (err) => this.errorMessages.push(err),
    });
  }

  toggleAddPreparationStep(): void {
    this.displayAddPreparationStep = !this.displayAddPreparationStep;
  }
}
