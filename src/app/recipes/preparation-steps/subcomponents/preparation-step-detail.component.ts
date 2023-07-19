import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPreparationStep } from '../models/preparation-step';
import { PreparationStepService } from '../preparation-step.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'preparation-step-detail',
  templateUrl: './preparation-step-detail.component.html',
})
export class PreparationStepDetailComponent implements OnInit, OnDestroy {
  preparationStep: IPreparationStep | undefined;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const recipeId = Number(this.route.snapshot.paramMap.get('recipeid'));
    this.getPreparationStep(id, recipeId);
  }

  getPreparationStep(id: number, recipeId: number): void {
    this.errorMessage = '';
    this.preparationStepService
      .getPreparationStep(id, recipeId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fecthing the preparation step : ' + err);
          this.errorMessage =
            'An error occurred while fetching the preparation step.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (preparationStep) => (this.preparationStep = preparationStep),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
