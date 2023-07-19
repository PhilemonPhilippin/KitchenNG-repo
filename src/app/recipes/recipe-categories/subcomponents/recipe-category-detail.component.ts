import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRecipeCategory } from '../models/recipe-category';
import { RecipeCategoryService } from '../recipe-category.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-category-detail',
  templateUrl: './recipe-category-detail.component.html',
})
export class RecipeCategoryDetailComponent implements OnInit, OnDestroy {
  recipeCategory: IRecipeCategory | undefined;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getRecipeCategory(id);
    }
  }

  getRecipeCategory(id: number): void {
    this.errorMessage = '';
    this.recipeCategoryService
      .getRecipeCategory(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fetching the category: ' + err);
          this.errorMessage = 'An error occurred while fetching the category.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (recipeCategory) => (this.recipeCategory = recipeCategory),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
