import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IngredientService } from '../../ingredients/ingredient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IIngredientNoDesc } from '../../ingredients/models/ingredient-no-desc';
import { RecipeIngredientService } from '../recipe-ingredient.service';
import { IRecipeIngredientAddRequest } from '../models/recipe-ingredient-add-request';
import { IIngredientRequest } from '../../ingredients/models/ingredient-request';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-ingredient-add',
  templateUrl: './recipe-ingredient-add.component.html',
})
export class RecipeIngredientAddComponent implements OnInit, OnDestroy {
  @Output() closingAdd = new EventEmitter();
  @Output() addSucccessful = new EventEmitter();
  @Input() recipeId: number = 0;

  ingredientsNoDesc: IIngredientNoDesc[] = [];
  statusCode: number = 0;
  errorMessage: string = '';
  nameExists: boolean = false;
  existingIngredient: IIngredientNoDesc | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private ingredientService: IngredientService,
    private recipeIngredientService: RecipeIngredientService
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.ingredientService
      .getIngredientsNoDesc()
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
        next: (ingredientsNoDesc) =>
          (this.ingredientsNoDesc = ingredientsNoDesc),
      });
  }

  onSubmit(): void {
    this.statusCode = 0;
    this.errorMessage = '';
    this.nameExists = false;
    this.existingIngredient = undefined;

    if (this.ingredientForm.valid) {
      const ingredient: IIngredientRequest = {
        name: this.ingredientForm.value.name || '',
        description: this.ingredientForm.value.description || undefined,
      };

      this.existingIngredient = this.ingredientsNoDesc.find(
        (i) => i.name == ingredient.name
      );

      if (this.existingIngredient !== undefined) {
        this.nameExists = true;
        const recipeIngredient: IRecipeIngredientAddRequest = {
          ingredientId: this.existingIngredient.id,
          ingredientQuantity: this.ingredientForm.value.quantity || '',
        };
        this.PostRecipeIngredient(recipeIngredient);
      } else {
        let addedIngredientId: number = 0;
        this.ingredientService
          .addIngredient(ingredient)
          .pipe(
            takeUntil(this.destroy$),
            catchError((err) => {
              console.log('Error adding the ingredient: ' + err);
              this.errorMessage =
                'An error occurred while adding the ingredient.';
              return EMPTY;
            })
          )
          .subscribe({
            next: (response) => {
              addedIngredientId = response.id;
              const recipeIngredient: IRecipeIngredientAddRequest = {
                ingredientId: addedIngredientId,
                ingredientQuantity: this.ingredientForm.value.quantity || '',
              };
              this.PostRecipeIngredient(recipeIngredient);
            },
          });
      }
    }
  }

  private PostRecipeIngredient(
    recipeIngredient: IRecipeIngredientAddRequest
  ): void {
    this.errorMessage = '';
    this.statusCode = 0;
    this.recipeIngredientService
      .addRecipeIngredient(this.recipeId, recipeIngredient)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error adding the ingredient: ' + err);
          this.errorMessage = 'An error occurred while adding the ingredient.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (this.statusCode == 204) {
            this.ingredientForm.setValue({
              name: '',
              description: '',
              quantity: '',
            });
            this.addSucccessful.emit();
            this.closeAdd();
          }
        },
      });
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
