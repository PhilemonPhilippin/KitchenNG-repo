import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PreparationStepService } from '../preparation-step.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './preparation-step.component.html',
})
export class PreparationStepComponent implements OnInit, OnDestroy {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  statusCode: number = 0;
  errorMessage: string = '';
  id: number = 0;
  recipeId: number = 0;
  sub!: Subscription;

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

  deleteClicked(): void {
    this.sub = this.preparationStepService
      .deletePreparationStep(this.id, this.recipeId)
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (response.status === 204) {
            this.router.navigate(['/recipes', this.recipeId]);
          }
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
