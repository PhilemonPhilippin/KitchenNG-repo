import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeCategoryService } from '../../recipe-categories/recipe-category.service';
import { IRecipeCategory } from '../../recipe-categories/models/recipe-category';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { IRecipeRequest } from '../models/recipe-request';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe-add',
  templateUrl: './recipe-add.component.html',
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  @Output() closingAdd = new EventEmitter();
  recipeCategories: IRecipeCategory[] = [];
  errorMessages: string[] = [];
  subOne!: Subscription;
  subTwo!: Subscription;

  recipeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    recipeCategory: new FormControl('', [
      Validators.required,
      Validators.maxLength(36),
    ]),
  });

  constructor(
    private recipeCategoryService: RecipeCategoryService,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subOne = this.recipeCategoryService.getRecipeCategories().subscribe({
      next: (recipeCategories) => (this.recipeCategories = recipeCategories),
      error: (err) => this.errorMessages.push(err),
    });
  }

  onSubmit() {
    const recipe: IRecipeRequest = {
      title: this.recipeForm.value.title as string,
      description: this.recipeForm.value.description ?? undefined,
      recipeCategoryId: this.recipeForm.value.recipeCategory as string,
    };
    this.subTwo = this.recipeService.addRecipe(recipe).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.closeAdd();
            this.router.navigate(['/recipes', recipe.id]);
        }
      },
      error: (err) => this.errorMessages.push(err),
    });
  }

  closeAdd() {
    this.closingAdd.emit();
  }

  ngOnDestroy(): void {
    if (this.subOne) {
      this.subOne.unsubscribe();
    }
  }
}
