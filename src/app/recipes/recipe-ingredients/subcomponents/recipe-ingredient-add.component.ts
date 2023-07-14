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
import { Subscription } from 'rxjs';
import { IIngredientRequest } from '../../ingredients/models/ingredient-request';

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
  errorMessages: string[] = [];
  nameExists: boolean = false;
  existingIngredient: IIngredientNoDesc | undefined;
  subOne!: Subscription;
  subTwo!: Subscription;

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
    this.ingredientService.getIngredientsNoDesc().subscribe({
      next: (ingredientsNoDesc) => (this.ingredientsNoDesc = ingredientsNoDesc),
      error: (err) => this.errorMessages.push(err),
    });
  }

  onSubmit(): void {
    this.statusCode = 0;
    this.nameExists = false;
    this.existingIngredient = undefined;

    if (this.ingredientForm.valid) {
      const ingredient: IIngredientRequest = {
        name: this.ingredientForm.value.name as string,
        description: this.ingredientForm.value.description ?? undefined,
      };

      this.existingIngredient = this.ingredientsNoDesc.find(
        (i) => i.name == ingredient.name
      );

      if (this.existingIngredient !== undefined) {
        this.nameExists = true;
        const recipeIngredient: IRecipeIngredientAddRequest = {
          ingredientId: this.existingIngredient.id,
          ingredientQuantity: this.ingredientForm.value.quantity as string,
        };
        this.PostRecipeIngredient(recipeIngredient);
      } else {
        let addedIngredientId: number = 0;
        this.subTwo = this.ingredientService
          .addIngredient(ingredient)
          .subscribe({
            next: (response) => {
              addedIngredientId = response.id;
              const recipeIngredient: IRecipeIngredientAddRequest = {
                ingredientId: addedIngredientId,
                ingredientQuantity: this.ingredientForm.value
                  .quantity as string,
              };
              this.PostRecipeIngredient(recipeIngredient);
            },
            error: (err) => this.errorMessages.push(err),
          });
      }
    }
  }

  private PostRecipeIngredient(
    recipeIngredient: IRecipeIngredientAddRequest
  ): void {
    this.subOne = this.recipeIngredientService
      .addRecipeIngredient(this.recipeId, recipeIngredient)
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
        error: (err) => this.errorMessages.push(err),
      });
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    if (this.subOne) {
      this.subOne.unsubscribe();
    }
    if (this.subTwo) {
      this.subTwo.unsubscribe();
    }
  }
}
