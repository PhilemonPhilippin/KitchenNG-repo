import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../models/recipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipeRequest } from '../models/recipe-request';
import { RecipeCategoryService } from '../../recipe-categories/recipe-category.service';
import { IRecipeCategory } from '../../recipe-categories/models/recipe-category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  @Output() closingEdit = new EventEmitter();
  recipe: IRecipe | undefined;
  errorMessages: string[] = [];
  statusCode: number = 0;
  recipeCategories: IRecipeCategory[] = [];
  subOne!: Subscription;
  subTwo!: Subscription;
  subThree!: Subscription;

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    recipeCategory: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.subOne = this.recipeService.getRecipe(id).subscribe((recipe) => {
        this.recipe = recipe;
        this.recipeForm = new FormGroup({
          title: new FormControl(this.recipe.title, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          description: new FormControl(this.recipe.description ?? null, [
            Validators.maxLength(500),
          ]),
          recipeCategory: new FormControl<number>(
            this.recipe.recipeCategory.id,
            [Validators.required]
          ),
        });
      });
    }
    this.subTwo = this.recipeCategoryService.getRecipeCategories().subscribe({
      next: (recipeCategories) => (this.recipeCategories = recipeCategories),
      error: (err) => this.errorMessages.push(err),
    });
  }

  onSubmit(): void {
    this.statusCode = 0;
    if (this.recipe && this.recipeForm.valid) {
      const recipeUpdateRequest: IRecipeRequest = {
        title: this.recipeForm.value.title as string,
        description: this.recipeForm.value.description ?? undefined,
        recipeCategoryId: Number(this.recipeForm.value.recipeCategory),
      };

      this.subThree = this.recipeService
        .editRecipe(this.recipe.id, recipeUpdateRequest)
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.closeEdit();
            }
          },
          error: (err) => this.errorMessages.push(err),
        });
    }
  }

  closeEdit(): void {
    this.closingEdit.emit();
  }

  ngOnDestroy(): void {
    this.subOne.unsubscribe();
    this.subTwo.unsubscribe();
    if (this.subThree) {
      this.subThree.unsubscribe();
    }
  }
}
