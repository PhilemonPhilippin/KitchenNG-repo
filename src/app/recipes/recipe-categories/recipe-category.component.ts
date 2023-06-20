import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'recipe-category.component.html',
})
export class RecipeCategoryComponent {
  displayDetail: boolean = true;
  displayEdit: boolean = false;

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  closeEdit(): void {
    this.displayEdit = false;
    this.displayDetail = true;
  }
}
