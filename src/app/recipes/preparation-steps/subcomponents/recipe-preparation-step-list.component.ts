import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipeIngredient } from '../../recipe-ingredients/models/recipe-ingredient';
import { PreparationStepService } from '../../preparation-steps/preparation-step.service';
import { IPreparationStep } from '../models/preparation-step';
import { Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-preparation-step-list',
  templateUrl: './recipe-preparation-step-list.component.html',
})
export class RecipePreparationStepListComponent implements OnInit, OnDestroy {
  recipeId: number = 0;
  recipeIngredients: IRecipeIngredient[] = [];
  preparationSteps: IPreparationStep[] = [];
  errorMessage: string = '';
  displayAddPreparationStep: boolean = false;
  addSuccessful: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPreparationSteps(this.recipeId);
  }

  getPreparationSteps(recipeId: number): void {
    this.errorMessage = '';
    this.preparationStepService
      .getPreparationSteps(recipeId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fetching the preparation steps: ' + err);
          this.errorMessage =
            'An error occurred while fetching the preparatio steps.';
          return [];
        })
      )
      .subscribe({
        next: (preparationSteps) => (this.preparationSteps = preparationSteps),
      });
  }

  toggleAddPreparationStep(): void {
    this.displayAddPreparationStep = !this.displayAddPreparationStep;
  }

  onAddSuccess() {
    this.ngOnInit();
    this.addSuccessful = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
