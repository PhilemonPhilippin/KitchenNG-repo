import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeIngredientService } from '../../services/recipe-ingredient.service';
import { IRecipe } from '../../models/dtos/recipe';
import { IRecipeIngredient } from '../../models/dtos/recipe-ingredient';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-ingredient-list',
  templateUrl: './recipe-ingredient-list.component.html',
})
export class RecipeIngredientListComponent implements OnInit, OnDestroy {
  recipe: IRecipe | undefined;
  recipeIngredients: IRecipeIngredient[] = [];
  displayAddIngredient: boolean = false;
  displayEditIngredient: boolean = false;
  addSuccessful: boolean = false;
  editSuccessful: boolean = false;
  recipeIngredientEdited: IRecipeIngredient | undefined;
  statusCode: number = 0;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

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
    this.errorMessage = '';
    this.recipeService
      .getRecipe(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fetching the recipe: ' + err);
          this.errorMessage = 'An error occurred while fetching the recipe.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (recipe) => (this.recipe = recipe),
      });
  }

  getRecipeIngredients(recipeId: number): void {
    this.errorMessage = '';
    this.recipeIngredientService
      .getRecipeIngredients(recipeId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fetching the ingredients: ' + err);
          this.errorMessage =
            'An error occurred while fetching the ingredients.';
          return [];
        })
      )
      .subscribe({
        next: (recipeIngredients) =>
          (this.recipeIngredients = recipeIngredients),
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

  onAddSuccess(): void {
    this.ngOnInit();
    this.addSuccessful = true;
    setTimeout(() => {
      this.addSuccessful = false;
    }, 5000);
  }

  onEditSuccess(): void {
    this.ngOnInit();
    this.editSuccessful = true;
    setTimeout(() => {
      this.editSuccessful = false;
    }, 5000);
  }

  removeClicked(ingredientId: number): void {
    this.statusCode = 0;
    this.errorMessage = '';
    if (this.recipe?.id) {
      this.recipeIngredientService
        .removeRecipeIngredient(this.recipe.id, ingredientId)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error removing the ingredient: ' + err);
            this.errorMessage =
              'An error occurred while removing the ingredient.';
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.ngOnInit();
            }
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
