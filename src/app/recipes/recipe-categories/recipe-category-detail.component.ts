import { Component, OnInit } from '@angular/core';
import { IRecipeCategory } from './recipe-category';
import { RecipeCategoryService } from './recipe-category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-category-detail',
  templateUrl: './recipe-category-detail.component.html',
})
export class RecipeCategoryDetailComponent implements OnInit {
  recipeCategory: IRecipeCategory | undefined;
  errorMessage: string = '';
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
    this.recipeCategoryService.getRecipeCategory(id).subscribe({
      next: (recipeCategory) => (this.recipeCategory = recipeCategory),
      error: (err) => (this.errorMessage = err),
    });
  }
}
