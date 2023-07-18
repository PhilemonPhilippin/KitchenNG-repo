import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, catchError, takeUntil } from 'rxjs';
import { IRecipeCategory } from '../models/recipe-category';
import { RecipeCategoryService } from '../recipe-category.service';

@Component({
  templateUrl: './recipe-category-list.component.html',
})
export class RecipeCategoryListComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  recipeCategories: IRecipeCategory[] = [];
  displayAdd: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private recipeCategoryService: RecipeCategoryService) {}

  ngOnInit(): void {
    this.getRecipeCategories();
  }

  private getRecipeCategories(): void {
    this.errorMessage = '';
    this.recipeCategoryService
      .getRecipeCategories()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fetching category list: ' + err);
          this.errorMessage =
            'An error occurred while fetching the category list.';
          return [];
        })
      )
      .subscribe({
        next: (response) => {
          this.recipeCategories = response;
        },
      });
  }

  toggleAdd(): void {
    this.displayAdd = !this.displayAdd;
  }

  refresh() {
    this.getRecipeCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
