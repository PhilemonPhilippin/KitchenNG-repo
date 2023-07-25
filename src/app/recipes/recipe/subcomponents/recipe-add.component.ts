import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeCategoryService } from '../../recipe-categories/recipe-category.service';
import { IRecipeCategory } from '../../recipe-categories/models/recipe-category';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { IRecipeRequest } from '../models/recipe-request';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe-add',
  templateUrl: './recipe-add.component.html',
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  @Output() closingAdd = new EventEmitter();

  recipeCategories: IRecipeCategory[] = [];
  errorMessage: string = '';
  statusCode: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    recipeCategory: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private recipeCategoryService: RecipeCategoryService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.recipeCategoryService
      .getRecipeCategories()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error retrieving categories: ' + err);
          this.errorMessage =
            'An error occurred while retrieving the categories.';
          return [];
        })
      )
      .subscribe({
        next: (recipeCategories) => (this.recipeCategories = recipeCategories),
      });
  }

  onSubmit() {
    this.errorMessage = '';
    this.statusCode = 0;

    if (this.recipeForm.valid) {
      const recipe: IRecipeRequest = {
        title: this.recipeForm.value.title || '',
        description: this.recipeForm.value.description || undefined,
        recipeCategoryId: Number(this.recipeForm.value.recipeCategory),
      };

      this.recipeService
        .addRecipe(recipe)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error adding the recipe: ' + err);
            this.errorMessage = 'An error occurred while adding the recipe';
            return EMPTY;
          })
        )
        .subscribe({
          next: (recipe) => {
            if (recipe) {
              this.statusCode = 201;
              this.closeAdd();
              this.router.navigate(['/recipes', recipe.id]);
            }
          },
        });
    }
  }

  closeAdd() {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
