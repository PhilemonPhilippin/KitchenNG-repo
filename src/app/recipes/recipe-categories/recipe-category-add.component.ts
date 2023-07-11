import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeCategoryService } from './recipe-category.service';
import { Subscription } from 'rxjs';
import { IRecipeCategoryAddRequest } from './recipe-category-add-request';

@Component({
  selector: 'recipe-category-add',
  templateUrl: './recipe-category-add.component.html',
})
export class RecipeCategoryAddComponent implements OnDestroy {
  @Output() closingEdit = new EventEmitter();
  @Output() addSuccessful = new EventEmitter();
  sub!: Subscription;
  errorMessages: string[] = [];

  recipeCategoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(private recipeCategoryService: RecipeCategoryService) {}
  onSubmit(): void {
    const recipeCategory: IRecipeCategoryAddRequest = {
      title: this.recipeCategoryForm.value.title as string,
      description: this.recipeCategoryForm.value.description as string,
    };
    this.sub = this.recipeCategoryService
      .addRecipeCategory(recipeCategory)
      .subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.addSuccessful.emit();
            this.closeEdit();
          }
        },
        error: (err) => this.errorMessages.push(err),
      });
  }

  closeEdit() {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
