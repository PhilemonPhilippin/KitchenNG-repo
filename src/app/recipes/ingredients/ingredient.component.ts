import { Component } from "@angular/core";
import { Location } from '@angular/common';

@Component({
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent {
  displayDetail: boolean = true;
  displayEdit: boolean = false;

  constructor(private _location: Location) {}

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }
}