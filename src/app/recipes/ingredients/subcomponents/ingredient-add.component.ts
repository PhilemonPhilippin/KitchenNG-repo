import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientService } from '../ingredient.service';
import { IIngredientAddRequest } from '../models/ingredient-add-request';

@Component({
  selector: 'ingredient-add',
  templateUrl: './ingredient-add.component.html',
})
export class IngredientAddComponent implements OnDestroy {
  @Output() closingAdd = new EventEmitter();
  @Output() addSucccessful = new EventEmitter();
  nameExists: boolean = false;
  statusCode: number = 0;
  sub!: Subscription;
  errorMessages: string[] = [];

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
      this.sub = this.ingredientService.nameExist(name).subscribe({
        next: (exist) => {
          this.nameExists = exist;
          if (exist === false) {
            const description: string | undefined =
              this.ingredientForm.value.description ?? undefined;
            const ingredient: IIngredientAddRequest = {
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

  private postIngredient(ingredient: IIngredientAddRequest): void {
    this.ingredientService.addIngredient(ingredient).subscribe({
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
    this.sub.unsubscribe();
  }
}
