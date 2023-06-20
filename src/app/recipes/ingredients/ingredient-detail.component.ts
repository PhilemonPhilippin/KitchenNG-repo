import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from './ingredient.service';
import { IIngredient } from './ingredient';

@Component({
  templateUrl: './ingredient-detail.component.html',
})
export class IngredientDetailComponent implements OnInit {
  ingredient: IIngredient | undefined;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getIngredient(id);
    }
  }

  private getIngredient(id: string): void {
    this.ingredientService.getIngredient(id).subscribe({
      next: (ingredient) => (this.ingredient = ingredient),
      error: (err) => (this.errorMessage = err),
    });
  }
}
