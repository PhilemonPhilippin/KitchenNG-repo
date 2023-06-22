import { Component } from '@angular/core';

@Component({
  templateUrl: './recipe.component.html',
})
export class RecipeComponent {
  displayRecipeDetail: boolean = true;
  displayRecipeEdit: boolean = false;
  toggleRecipeEdit() {
    this.displayRecipeDetail = !this.displayRecipeDetail;
    this.displayRecipeEdit = !this.displayRecipeEdit;
  }
}
