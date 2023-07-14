import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../recipe/recipe.service';
import { RecipeIngredientService } from '../../recipe-ingredients/recipe-ingredient.service';
import { IRecipe } from '../../recipe/models/recipe';
import { IRecipeIngredient } from '../../recipe-ingredients/models/recipe-ingredient';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-ingredient-list',
  templateUrl: './recipe-ingredient-list.component.html',
})
export class RecipeIngredientListComponent implements OnInit, OnDestroy {
  recipe: IRecipe | undefined;
  recipeIngredients: IRecipeIngredient[] = [];
  errorMessages: string[] = [];
  displayAddIngredient: boolean = false;
  displayEditIngredient: boolean = false;
  recipeIngredientEdited: IRecipeIngredient | undefined;
  statusCode: number = 0;
  subOne!: Subscription;
  subTwo!: Subscription;
  subThree!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getRecipe(id);
      this.getRecipeIngredients(id);
    }
  }

  getRecipe(id: number): void {
    this.subOne = this.recipeService.getRecipe(id).subscribe({
      next: (recipe) => (this.recipe = recipe),
      error: (err) => this.errorMessages.push(err),
    });
  }

  getRecipeIngredients(recipeId: number): void {
    this.subTwo = this.recipeIngredientService
      .getRecipeIngredients(recipeId)
      .subscribe({
        next: (recipeIngredients) =>
          (this.recipeIngredients = recipeIngredients),
        error: (err) => this.errorMessages.push(err),
      });
  }

  toggleAddIngredient(): void {
    this.displayAddIngredient = !this.displayAddIngredient;
  }

  toggleEditIngredient(recipeIngredient: IRecipeIngredient): void {
    this.recipeIngredientEdited = recipeIngredient;
    this.displayEditIngredient = !this.displayEditIngredient;
    if (this.displayEditIngredient) {
      document
        .getElementById('editcompo')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closeEdit(): void {
    this.displayEditIngredient = false;
    document
      .getElementById('ingredients')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  removeClicked(ingredientId: number): void {
    if (this.recipe?.id) {
      this.subThree = this.recipeIngredientService
        .removeRecipeIngredient(this.recipe.id, ingredientId)
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.ngOnInit();
            }
          },
          error: (err) => this.errorMessages.push(err),
        });
    }
  }

  refresh(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    if (this.subThree) {
      this.subThree.unsubscribe();
    }
  }
}
