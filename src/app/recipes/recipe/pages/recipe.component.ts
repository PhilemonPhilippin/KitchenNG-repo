import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './recipe.component.html',
})
export class RecipeComponent implements OnInit, OnDestroy {
  displayRecipeDetail: boolean = true;
  displayRecipeEdit: boolean = false;
  id: number = 0;
  errorMessages: string[] = [];
  sub!: Subscription;

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

  deleteClicked() {
    if (this.id !== 0) {
      this.sub = this.recipeService.deleteRecipe(this.id).subscribe({
        next: (response) => {
          if (response.status == 204) {
            this.router.navigate(['/recipes']);
          }
        },
        error: (err) => this.errorMessages.push(err)
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
