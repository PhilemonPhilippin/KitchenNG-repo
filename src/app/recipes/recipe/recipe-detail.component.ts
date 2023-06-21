import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './recipe.service';
import { IRecipe } from './recipe';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: IRecipe | undefined;
  errorMessages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipe(id);
    }
  }

  getRecipe(id: string): void {
    this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => (this.recipe = recipe),
      error: (err) => this.errorMessages.push(err),
    });
  }
}
