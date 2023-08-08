import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IRecipeIngredient } from '../../models/dtos/recipe-ingredient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeIngredientService } from '../../services/recipe-ingredient.service';
import { IRecipeIngredientEditRequest } from '../../models/requests/recipe-ingredient-edit-request';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-ingredient-edit',
  templateUrl: './recipe-ingredient-edit.component.html',
})
export class RecipeIngredientEditComponent implements OnInit, OnDestroy {
  @Input() recipeId: number = 0;
  @Input() recipeIngredient: IRecipeIngredient | undefined;
  @Output() closingEdit = new EventEmitter();
  @Output() editSuccessful = new EventEmitter();

  statusCode: number = 0;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  ingredientForm = new FormGroup({
    quantity: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  constructor(private recipeIngredientService: RecipeIngredientService) {}

  ngOnInit(): void {
    this.ingredientForm.setValue({
      quantity: this.recipeIngredient?.ingredientQuantity || '',
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.statusCode = 0;

    const recipeIngredientRequest: IRecipeIngredientEditRequest = {
      ingredientQuantity: this.ingredientForm.value.quantity as string,
    };

    this.recipeIngredientService
      .editRecipeIngredient(
        this.recipeId,
        Number(this.recipeIngredient?.id),
        recipeIngredientRequest
      )
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error editing the ingredient: ' + err);
          this.errorMessage = 'An error occurred while editing the ingredient.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (response.status === 204) {
            this.closeEdit();
            this.editSuccessful.emit();
          }
        },
      });
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
