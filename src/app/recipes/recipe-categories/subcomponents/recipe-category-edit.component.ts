import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRecipeCategory } from '../models/recipe-category';
import { ActivatedRoute } from '@angular/router';
import { RecipeCategoryService } from '../recipe-category.service';
import { Subscription } from 'rxjs';
import { IRecipeCategoryRequest } from '../models/recipe-category-request';

@Component({
  selector: 'recipe-category-edit',
  templateUrl: './recipe-category-edit.component.html',
})
export class RecipeCategoryEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  recipeCategory: IRecipeCategory | undefined;
  errorMessage: string = '';
  statusCode: number = 0;
  id: number = 0;
  subOne!: Subscription;
  subTwo!: Subscription;

  recipeCategoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.subOne = this.recipeCategoryService
        .getRecipeCategory(this.id)
        .subscribe((recipeCategory) => {
          this.recipeCategory = recipeCategory;
          this.recipeCategoryForm = new FormGroup({
            title: new FormControl(this.recipeCategory.title, [
              Validators.required,
              Validators.maxLength(50),
            ]),
            description: new FormControl(
              this.recipeCategory.description ?? null,
              [Validators.maxLength(500)]
            ),
          });
        });
    }
  }

  onSubmit(): void {
    this.statusCode = 0;
    if (this.recipeCategory && this.recipeCategoryForm.valid) {
      const category: IRecipeCategoryRequest = {
        title: this.recipeCategoryForm.value.title as string,
        description: this.recipeCategoryForm.value.description ?? '',
      };

      this.subTwo = this.recipeCategoryService
        .editRecipeCategory(this.id, category)
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
  }

  closeEdit() {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.subOne.unsubscribe();
    if (this.subTwo) {
      this.subTwo.unsubscribe();
    }
  }
}
