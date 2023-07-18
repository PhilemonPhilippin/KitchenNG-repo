import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Subject, catchError, switchMap, takeUntil } from 'rxjs';
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
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private ingredientService: IngredientService) {}

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  onSubmit(): void {
    this.nameExists = true;
    if (this.ingredientForm.valid) {
      const name: string = this.ingredientForm.value.name as string;
      this.ingredientService
        .nameExist(name)
        .pipe(
          switchMap((exist) => {
            this.nameExists = exist;
            if (exist === false) {
              const description: string | undefined =
                this.ingredientForm.value.description ?? undefined;
              const ingredient: IIngredientRequest = {
                name: name,
                description: description,
              };
              return this.ingredientService.addIngredient(ingredient);
            } else {
              return EMPTY;
            }
          }),
          catchError((err) => {
            console.log('Error adding the ingredient: ' + err);
            this.errorMessage =
              'An error occurred while adding the ingredient.';
            return EMPTY;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe((response) => {
          if (response && response.id) {
            this.addSucccessful.emit();
            this.closeAdd();
          }
        });
    }
  }

  closeAdd(): void {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
