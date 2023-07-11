import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecipeCategory } from './recipe-category';
import { RecipeCategoryService } from './recipe-category.service';

@Component({
  templateUrl: './recipe-category-list.component.html',
})
export class RecipeCategoryListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  errorMessage: string = '';
  recipeCategories: IRecipeCategory[] = [];
  displayAdd: boolean = false;

  constructor(private recipeCategoryService: RecipeCategoryService) {}

  ngOnInit(): void {
    this.getRecipeCategories();
  }

  getRecipeCategories(): void {
    this.sub = this.recipeCategoryService.getRecipeCategories().subscribe({
      next: (recipeCategories) => (this.recipeCategories = recipeCategories),
      error: (err) => (this.errorMessage = err),
    });
  }

  toggleAdd(): void {
    this.displayAdd = !this.displayAdd;
  }

  refresh() {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
