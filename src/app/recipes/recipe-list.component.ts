import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { IRecipe } from './recipe';
import { Subscription } from 'rxjs';

@Component({ templateUrl: './recipe-list.component.html' })
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: IRecipe[] = [];
  errorMessage: string = '';
  sub!: Subscription;
  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.sub = this.recipeService.getRecipes().subscribe({
      next: (recipes) => (this.recipes = recipes),
      error: (err) => (this.errorMessage = err),
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
