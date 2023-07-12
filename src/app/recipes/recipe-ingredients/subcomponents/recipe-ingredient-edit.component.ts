import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IRecipeIngredient } from '../models/recipe-ingredient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeIngredientService } from '../recipe-ingredient.service';
import { IRecipeIngredientEditRequest } from '../models/recipe-ingredient-edit-request';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-ingredient-edit',
  templateUrl: './recipe-ingredient-edit.component.html',
})
export class RecipeIngredientEditComponent implements OnInit, OnDestroy {
  @Input() recipeId: string = '';
  @Input() recipeIngredient: IRecipeIngredient | undefined;
  @Output() closingEdit = new EventEmitter();
  @Output() editSuccessful = new EventEmitter();
  statusCode: number = 0;
  errorMessages: string[] = [];
  sub!: Subscription;
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
    this.sub = this.recipeIngredientService
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
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
