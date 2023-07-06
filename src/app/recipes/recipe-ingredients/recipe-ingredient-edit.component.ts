import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IRecipeIngredient } from './recipe-ingredient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { IRecipeIngredientEditRequest } from './recipe-ingredient-edit-request';

@Component({
  selector: 'recipe-ingredient-edit',
  templateUrl: './recipe-ingredient-edit.component.html',
})
export class RecipeIngredientEditComponent implements OnInit {
  @Input() recipeId: string = '';
  @Input() recipeIngredient: IRecipeIngredient | undefined;
  @Output() closingEdit = new EventEmitter();
  @Output() editSuccessful = new EventEmitter();
  statusCode: number = 0;
  errorMessages: string[] = [];
  ingredientForm = new FormGroup({
    quantity: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  constructor(private recipeIngredientService: RecipeIngredientService) {}

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      quantity: new FormControl(
        this.recipeIngredient?.ingredientQuantity ?? '',
        [Validators.required, Validators.maxLength(50)]
      ),
    });
  }
  onSubmit(): void {
    const recipeIngredientRequest: IRecipeIngredientEditRequest = {
      ingredientQuantity: this.ingredientForm.value.quantity as string,
    };
    this.recipeIngredientService
      .editRecipeIngredient(
        this.recipeId,
        this.recipeIngredient?.id as string,
        recipeIngredientRequest
      )
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (response.status === 204) {
            this.closeEdit();
            this.editSuccessful.emit();
          }
        },
        error: (err) => this.errorMessages.push(err),
      });
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }
}
