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
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { IRecipeCategoryRequest } from '../models/recipe-category-request';

@Component({
  selector: 'recipe-category-edit',
  templateUrl: './recipe-category-edit.component.html',
})
export class RecipeCategoryEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  @Output() editSuccess = new EventEmitter();

  recipeCategory: IRecipeCategory | undefined;
  errorMessage: string = '';
  statusCode: number = 0;
  id: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  recipeCategoryForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.recipeCategoryService
        .getRecipeCategory(this.id)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error fetching the category: ' + err);
            this.errorMessage =
              'An error occurred while fetching the category.';
            return EMPTY;
          })
        )
        .subscribe((recipeCategory) => {
          this.recipeCategory = recipeCategory;
          this.initializeFormControls(recipeCategory);
        });
    }
  }

  private initializeFormControls(recipeCategory: IRecipeCategory): void {
    this.recipeCategoryForm.setValue({
      title: recipeCategory?.title || '',
      description: recipeCategory?.description || '',
    });
  }

  onSubmit(): void {
    this.statusCode = 0;
    this.errorMessage = '';
    if (this.recipeCategory && this.recipeCategoryForm.valid) {
      const category: IRecipeCategoryRequest = {
        title: this.recipeCategoryForm.value.title || '',
        description: this.recipeCategoryForm.value.description || undefined,
      };

      this.recipeCategoryService
        .editRecipeCategory(this.id, category)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error editing the category: ' + err);
            this.errorMessage = 'An error occurred while editing the category';
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.editSuccess.emit();
              this.closeEdit();
            }
          },
        });
    }
  }

  closeEdit() {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
