import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientService } from '../ingredient.service';
import { IIngredientRequest } from '../models/ingredient-request';

@Component({
  selector: 'ingredient-add',
  templateUrl: './ingredient-add.component.html',
})
export class IngredientAddComponent implements OnDestroy {
  @Output() closingAdd = new EventEmitter();
  @Output() addSucccessful = new EventEmitter();
  nameExists: boolean = false;
  statusCode: number = 0;
  errorMessages: string[] = [];
  subOne!: Subscription;
  subTwo!: Subscription;

  constructor(private ingredientService: IngredientService) {}

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  onSubmit(): void {
    this.statusCode = 0;
    this.nameExists = true;
    if (this.ingredientForm.valid) {
      const name: string = this.ingredientForm.value.name as string;
      this.subOne = this.ingredientService.nameExist(name).subscribe({
        next: (exist) => {
          this.nameExists = exist;
          if (exist === false) {
            const description: string | undefined =
              this.ingredientForm.value.description ?? undefined;
            const ingredient: IIngredientRequest = {
              name: name,
              description: description,
            };
            this.postIngredient(ingredient);
          }
        },
        error: (err) => this.errorMessages.push(err),
      });
    }
  }

  private postIngredient(ingredient: IIngredientRequest): void {
    this.subTwo = this.ingredientService.addIngredient(ingredient).subscribe({
      next: (response) => {
        if (response.id) {
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
