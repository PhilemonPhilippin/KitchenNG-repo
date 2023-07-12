import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { IIngredient } from '../models/ingredient';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  ingredient: IIngredient | undefined;
  statusCode: number = 0;
  errorMessage: string = '';
  subOne!: Subscription;
  subTwo!: Subscription;

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subOne = this.ingredientService.getIngredient(id).subscribe((ingredient) => {
        this.ingredient = ingredient;
        this.ingredientForm = new FormGroup({
          name: new FormControl(this.ingredient.name, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          description: new FormControl(this.ingredient.description ?? null, [
            Validators.maxLength(500),
          ]),
        });
      });
    }
  }

  onSubmit(): void {
    this.statusCode = 0;
    if (this.ingredient && this.ingredientForm.valid) {
      const ingredient: IIngredient = {
        id: this.ingredient.id,
        name: this.ingredientForm.value.name as string,
        description: this.ingredientForm.value.description ?? '',
      };

      this.subTwo = this.ingredientService.editIngredient(ingredient).subscribe({
        next: (response) => {
          this.statusCode = response.status;
        },
        error: (err) => (this.errorMessage = err),
      });
    }
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.subOne.unsubscribe();
    if (this.subTwo) {
      this.subTwo.unsubscribe();
    }
  }
}
