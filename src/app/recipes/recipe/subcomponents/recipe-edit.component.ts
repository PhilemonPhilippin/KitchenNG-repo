import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/dtos/recipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipeRequest } from '../../models/requests/recipe-request';
import { RecipeCategoryService } from '../../services/recipe-category.service';
import { IRecipeCategory } from '../../models/dtos/recipe-category';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  @Output() editSuccess = new EventEmitter();

  recipe: IRecipe | undefined;
  errorMessage: string = '';
  statusCode: number = 0;
  recipeCategories: IRecipeCategory[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    recipeCategory: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService
      .getRecipe(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error retrieving the recipe: ' + err);
          this.errorMessage = 'An error occurred while retrieving the recipe.';
          return EMPTY;
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
        this.initializeFormControls(recipe);
      });

    this.recipeCategoryService
      .getRecipeCategories()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error while retrieving categories: ' + err);
          this.errorMessage =
            'An error occurred while retrieving the categories.';
          return [];
        })
      )
      .subscribe({
        next: (recipeCategories) => (this.recipeCategories = recipeCategories),
      });
  }

  private initializeFormControls(recipe: IRecipe): void {
    this.recipeForm.setValue({
      title: recipe?.title || '',
      description: recipe?.description || '',
      recipeCategory: Number(recipe?.recipeCategory.id),
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.statusCode = 0;
    if (this.recipe && this.recipeForm.valid) {
      const recipeUpdateRequest: IRecipeRequest = {
        title: this.recipeForm.value.title || '',
        description: this.recipeForm.value.description || undefined,
        recipeCategoryId: Number(this.recipeForm.value.recipeCategory),
      };

      this.recipeService
        .editRecipe(this.recipe.id, recipeUpdateRequest)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error while editing the recipe: ' + err);
            this.errorMessage = 'An error occurred while editing the recipe.';
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.editSuccess.emit();
              this.closeEdit();
            }
          },
        });
    }
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
