import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PreparationStepService } from '../preparation-step.service';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  templateUrl: './preparation-step.component.html',
})
export class PreparationStepComponent implements OnInit, OnDestroy {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  editSuccessful: boolean = false;
  statusCode: number = 0;
  errorMessage: string = '';
  id: number = 0;
  recipeId: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeId = Number(this.route.snapshot.paramMap.get('recipeid'));
  }

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }

  onEditSuccess(): void {
    this.editSuccessful = true;
    setTimeout(() => {
      this.editSuccessful = false;
    }, 5000);
  }

  deleteClicked(): void {
    this.statusCode = 0;
    this.errorMessage = '';

    this.preparationStepService
      .deletePreparationStep(this.id, this.recipeId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error while deleting preparation step: ' + err);
          this.errorMessage =
            'An error occurred while deleting preparation step.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (response.status === 204) {
            this.router.navigate(['/recipes', this.recipeId]);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
