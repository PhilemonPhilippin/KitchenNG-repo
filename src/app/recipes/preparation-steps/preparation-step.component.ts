import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PreparationStepService } from './preparation-step.service';

@Component({
  templateUrl: './preparation-step.component.html',
})
export class PreparationStepComponent implements OnInit {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  statusCode: number = 0;
  errorMessage: string = '';
  id: string = '';
  recipeId: string = '';

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private preparationStepService: PreparationStepService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.recipeId = this.route.snapshot.paramMap.get('recipeid') as string;
  }

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }

  deleteClicked(): void {
    this.preparationStepService
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
}
