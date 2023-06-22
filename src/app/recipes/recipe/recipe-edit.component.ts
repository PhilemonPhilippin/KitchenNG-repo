import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './recipe.service';
import { IRecipe } from './recipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipeUpdateRequest } from './recipe-update-request';
import { RecipeCategoryService } from '../recipe-categories/recipe-category.service';
import { IRecipeCategory } from '../recipe-categories/recipe-category';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  @Output() closingEdit = new EventEmitter();
  recipe: IRecipe | undefined;
  errorMessages: string[] = [];
  statusCode: number = 0;
  recipeCategories: IRecipeCategory[] = [];

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    recipeCategory: new FormControl('', [
      Validators.required,
      Validators.maxLength(36),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipe(id).subscribe((recipe) => {
        this.recipe = recipe;
        this.recipeForm = new FormGroup({
          title: new FormControl(this.recipe.title, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          description: new FormControl(this.recipe.description ?? null, [
            Validators.maxLength(500),
          ]),
          recipeCategory: new FormControl(this.recipe.recipeCategory.id, [
            Validators.required,
            Validators.maxLength(36),
          ]),
        });
      });
    }
    this.recipeCategoryService.getRecipeCategories().subscribe({
      next: (recipeCategories) => (this.recipeCategories = recipeCategories),
      error: (err) => this.errorMessages.push(err),
    });
  }

  onSubmit(): void {
    this.statusCode = 0;
    if (this.recipe && this.recipeForm.valid) {
      const recipeUpdateRequest: IRecipeUpdateRequest = {
        title: this.recipeForm.value.title as string,
        description: this.recipeForm.value.description ?? '',
        recipeCategoryId: this.recipeForm.value.recipeCategory as string,
      };

      this.recipeService
        .editRecipe(this.recipe.id, recipeUpdateRequest)
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
          },
          error: (err) => this.errorMessages.push(err),
        });
    }
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }
}
