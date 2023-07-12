import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPreparationStep } from '../models/preparation-step';
import { PreparationStepService } from '../preparation-step.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'preparation-step-detail',
  templateUrl: './preparation-step-detail.component.html',
})
export class PreparationStepDetailComponent implements OnInit, OnDestroy {
  preparationStep: IPreparationStep | undefined;
  errorMessage: string = '';
sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const recipeId = this.route.snapshot.paramMap.get('recipeid');
    if (id && recipeId) {
      this.getPreparationStep(id, recipeId);
    }
  }

  getPreparationStep(id: string, recipeId: string): void {
    this.sub = this.preparationStepService.getPreparationStep(id, recipeId).subscribe({
      next: (preparationStep) => (this.preparationStep = preparationStep),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
