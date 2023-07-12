import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRecipeCategory } from '../models/recipe-category';
import { RecipeCategoryService } from '../recipe-category.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-category-detail',
  templateUrl: './recipe-category-detail.component.html',
})
export class RecipeCategoryDetailComponent implements OnInit, OnDestroy {
  recipeCategory: IRecipeCategory | undefined;
  errorMessage: string = '';
sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipeCategory(id);
    }
  }

  getRecipeCategory(id: string): void {
    this.sub = this.recipeCategoryService.getRecipeCategory(id).subscribe({
      next: (recipeCategory) => (this.recipeCategory = recipeCategory),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
