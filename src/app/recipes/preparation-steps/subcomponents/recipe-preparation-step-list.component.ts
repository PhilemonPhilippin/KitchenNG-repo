import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../recipe/recipe.service';
import { RecipeIngredientService } from '../../recipe-ingredients/recipe-ingredient.service';
import { IRecipe } from '../../recipe/models/recipe';
import { IRecipeIngredient } from '../../recipe-ingredients/models/recipe-ingredient';
import { PreparationStepService } from '../../preparation-steps/preparation-step.service';
import { IPreparationStep } from '../models/preparation-step';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-preparation-step-list',
  templateUrl: './recipe-preparation-step-list.component.html',
})
export class RecipePreparationStepListComponent implements OnInit, OnDestroy {
  recipe: IRecipe | undefined;
  recipeIngredients: IRecipeIngredient[] = [];
  preparationSteps: IPreparationStep[] = [];
  errorMessages: string[] = [];
  displayAddPreparationStep: boolean = false;
  subOne!: Subscription;
  subTwo!: Subscription;

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
    this.subOne = this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => (this.recipe = recipe),
      error: (err) => this.errorMessages.push(err),
    });
  }
  getPreparationSteps(recipeId: string): void {
    this.subTwo = this.preparationStepService.getPreparationSteps(recipeId).subscribe({
      next: (preparationSteps) => (this.preparationSteps = preparationSteps),
      error: (err) => this.errorMessages.push(err),
    });
  }

  toggleAddPreparationStep(): void {
    this.displayAddPreparationStep = !this.displayAddPreparationStep;
  }

  refresh(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subOne.unsubscribe();
    this.subTwo.unsubscribe();
  }
}
