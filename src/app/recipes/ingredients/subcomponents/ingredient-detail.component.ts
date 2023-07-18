import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { IIngredient } from '../models/ingredient';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
})
export class IngredientDetailComponent implements OnInit, OnDestroy {
  ingredient: IIngredient | undefined;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getIngredient(id);
    }
  }

  private getIngredient(id: number): void {
    this.ingredientService
      .getIngredient(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (ingredient) => (this.ingredient = ingredient),
        error: (err) => {
          console.log('Error fetching the ingredient: ' + err);
          this.errorMessage =
            'An error occurred while fetching the ingredient.';
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
