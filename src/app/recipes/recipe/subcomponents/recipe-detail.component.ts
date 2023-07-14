import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../models/recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: IRecipe | undefined;
  errorMessages: string[] = [];
  sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getRecipe(id);
    }
  }

  getRecipe(id: number): void {
    this.sub = this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => (this.recipe = recipe),
      error: (err) => this.errorMessages.push(err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
