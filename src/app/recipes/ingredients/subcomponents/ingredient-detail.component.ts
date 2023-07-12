import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { IIngredient } from '../models/ingredient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
})
export class IngredientDetailComponent implements OnInit, OnDestroy {
  ingredient: IIngredient | undefined;
  errorMessage: string = '';
  sub!: Subscription;

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
    this.sub = this.ingredientService.getIngredient(id).subscribe({
      next: (ingredient) => (this.ingredient = ingredient),
      error: (err) => (this.errorMessage = err),
    });
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
