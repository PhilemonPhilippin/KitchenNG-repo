import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeCategoryService } from '../recipe-category.service';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { IRecipeCategoryRequest } from '../models/recipe-category-request';

@Component({
  selector: 'recipe-category-add',
  templateUrl: './recipe-category-add.component.html',
})
export class RecipeCategoryAddComponent implements OnDestroy {
  @Output() closingEdit = new EventEmitter();
  @Output() addSuccessful = new EventEmitter();

  private destroy$: Subject<void> = new Subject<void>();
  errorMessage: string = '';
  statusCode: number = 0;

  recipeCategoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(private recipeCategoryService: RecipeCategoryService) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.statusCode = 0;

    const recipeCategory: IRecipeCategoryRequest = {
      title: this.recipeCategoryForm.value.title || '',
      description: this.recipeCategoryForm.value.description || undefined,
    };

    this.recipeCategoryService
      .addRecipeCategory(recipeCategory)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error while adding the category: ' + err);
          this.errorMessage = 'An error occurred while adding the category';
          return EMPTY;
        })
      )
      .subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.statusCode = response.status;
            this.addSuccessful.emit();
            this.closeEdit();
          }
        },
      });
  }

  closeEdit() {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
