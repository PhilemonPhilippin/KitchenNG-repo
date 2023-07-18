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
import { Subscription } from 'rxjs';
import { IIngredientRequest } from '../models/ingredient-request';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
})
export class IngredientEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  ingredient: IIngredient | undefined;
  nameExists = false;
  statusCode = 0;
  errorMessage = '';
  subOne!: Subscription;
  subTwo!: Subscription;
  subThree!: Subscription;
  id: number = 0;

  ingredientForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id !== 0) {
      this.subOne = this.ingredientService
        .getIngredient(this.id)
        .subscribe((ingredient) => {
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

  onSubmit() {
    this.statusCode = 0;
    this.nameExists = true;
    if (this.ingredient && this.ingredientForm.valid && this.id !== 0) {
      const name = this.ingredientForm.value.name as string;
      this.subTwo = this.ingredientService.nameExist(name).subscribe({
        next: (exist) => {
          this.nameExists = exist;
          if (exist === false) {
            const description =
              this.ingredientForm.value.description ?? undefined;
            const ingredient: IIngredientRequest = {
              name: name,
              description: description,
            };
            this.editIngredient(ingredient);
          }
        },
      });
    }
  }
  editIngredient(ingredient: IIngredientRequest) {
    this.subThree = this.ingredientService
      .editIngredient(this.id, ingredient)
      .subscribe({
        next: (response) => {
          this.statusCode = response.status;
          if (response.status === 204) {
            this.closeEdit();
          }
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  closeEdit() {
    this.closingEdit.emit();
  }

  ngOnDestroy() {
    this.subOne.unsubscribe();
    if (this.subTwo) {
      this.subTwo.unsubscribe();
    }
    if (this.subThree) {
      this.subThree.unsubscribe();
    }
  }
}
