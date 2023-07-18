import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IIngredient } from '../models/ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IIngredientRequest } from '../models/ingredient-request';
import { IIngredientNoDesc } from '../models/ingredient-no-desc';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();

  ingredientsNoDesc: IIngredientNoDesc[] = [];
  ingredient: IIngredient | undefined;
  nameExists = false;
  statusCode = 0;
  errorMessage = '';
  id: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  private initializeFormControls(): void {
    this.ingredientForm.setValue({
      name: this.ingredient?.name || '',
      description: this.ingredient?.description || '',
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== 0) {
      this.ingredientService
        .getIngredient(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((ingredient) => {
          this.ingredient = ingredient;
          this.initializeFormControls();
        });
    }
    this.ingredientService
      .getIngredientsNoDesc()
      .pipe(takeUntil(this.destroy$))
      .subscribe((ingredients) => {
        this.ingredientsNoDesc = ingredients;
      });
  }

  onSubmit() {
    this.statusCode = 0;
    this.errorMessage = '';
    this.nameExists = false;
    if (this.ingredient && this.ingredientForm.valid && this.id !== 0) {
      const name = this.ingredientForm.value.name || '';
      const description = this.ingredientForm.value.description || undefined;
      const ingredient: IIngredientRequest = {
        name: name,
        description: description,
      };

      this.nameExists = this.ingredientsNoDesc.some(
        (i) => i.name == ingredient.name && i.id != this.id
      );

      if (this.nameExists === false) {
        this.ingredientService
          .editIngredient(this.id, ingredient)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              this.statusCode = response.status;
              if (response.status === 204) {
                this.closeEdit();
              }
            },
            error: (err) => {
              console.log('Error editing the ingredient: ' + err);
              this.errorMessage =
                'An error occurred while editing the ingredient.';
            },
          });
      }
    }
  }

  closeEdit() {
    this.closingEdit.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
