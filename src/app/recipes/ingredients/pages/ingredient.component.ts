import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent implements OnInit, OnDestroy {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  id: number = 0;
  errorMessages: string[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }

  deleteClicked(id: number): void {
    this.ingredientService
      .deleteIngredient(id)
      .pipe(
        catchError((err) => {
          this.errorMessages.push(err);
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response.status === 204) {
            this._location.back();
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
