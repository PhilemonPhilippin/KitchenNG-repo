import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/dtos/recipe';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: IRecipe | undefined;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getRecipe(id);
    }
  }

  getRecipe(id: number): void {
    this.recipeService
      .getRecipe(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error retrieving the recipe: ' + err);
          this.errorMessage = 'An error occurred while retrieving the recipe.';
          return EMPTY;
        })
      )
      .subscribe({
        next: (recipe) => (this.recipe = recipe),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
