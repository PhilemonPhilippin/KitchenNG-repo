import { Component } from "@angular/core";

@Component({
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent {
  displayDetail: boolean = true;
  displayEdit: boolean = false;

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }
}