import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';

@Component({
  templateUrl: './recipe.component.html',
})
export class RecipeComponent implements OnInit, OnDestroy {
  displayRecipeDetail: boolean = true;
  displayRecipeEdit: boolean = false;
  editSuccessful: boolean = false;
  id: number = 0;
  errorMessage: string = '';
  statusCode: number = 0;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  toggleRecipeEdit() {
    this.displayRecipeDetail = !this.displayRecipeDetail;
    this.displayRecipeEdit = !this.displayRecipeEdit;
  }

  onEditSuccess(): void {
    this.editSuccessful = true;
    setTimeout(() => {
      this.editSuccessful = false;
    }, 5000);
  }

  deleteClicked() {
    this.errorMessage = '';
    this.statusCode = 0;

    if (this.id !== 0) {
      this.recipeService
        .deleteRecipe(this.id)
        .pipe(
          takeUntil(this.destroy$),
          catchError((err) => {
            console.log('Error deleting the recipe: ' + err);
            this.errorMessage = 'An error occurred while deleting the recipe.';
            return EMPTY;
          })
        )
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status == 204) {
              this.router.navigate(['/recipes']);
            }
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
