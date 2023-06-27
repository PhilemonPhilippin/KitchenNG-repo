import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientService } from '../ingredients/ingredient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IIngredientAddRequest } from '../ingredients/ingredient-add-request';
import { IIngredientNoDesc } from '../ingredients/ingredient-no-desc';
import { RecipeIngredientService } from './recipe-ingredient.service';
import { IRecipeIngredientAddRequest } from './recipe-ingredient-add-request';

@Component({
  selector: 'recipe-ingredient-add',
  templateUrl: './recipe-ingredient-add.component.html',
})
export class RecipeIngredientAddComponent implements OnInit {
  @Output() closingAdd = new EventEmitter();
  @Input() recipeId: string = '';

  ingredientsNoDesc: IIngredientNoDesc[] = [];
  statusCode: number = 0;
  errorMessages: string[] = [];
  nameExists: boolean = false;

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
    if (this.ingredientForm.valid) {
      const ingredient: IIngredientAddRequest = {
        name: this.ingredientForm.value.name as string,
        description: this.ingredientForm.value.description ?? undefined,
      };

      if (this.ingredientsNoDesc.some((i) => i.name == ingredient.name)) {
        this.nameExists = true;
      } else {
        let addedIngredientId: string = '';
        this.ingredientService.addIngredient(ingredient).subscribe({
          next: (response) => {
            addedIngredientId = response.id;
            const recipeIngredient: IRecipeIngredientAddRequest = {
              ingredientId: addedIngredientId,
              ingredientQuantity: this.ingredientForm.value.quantity as string,
            };
            this.recipeIngredientService
              .addRecipeIngredient(this.recipeId, recipeIngredient)
              .subscribe({
                next: (response) => {
                  this.statusCode = response.status;
                },
                error: (err) => this.errorMessages.push(err),
              });
          },
          error: (err) => this.errorMessages.push(err),
        });
      }
    }
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }
}
