import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RecipeCategoryService } from '../recipe-category.service';

@Component({
  templateUrl: './recipe-category.component.html',
})
export class RecipeCategoryComponent implements OnInit, OnDestroy {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  sub!: Subscription;
  id: string | null = '';
  errorMessages: string[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }

  deleteClicked() {
    if (this.id) {
      this.sub = this.recipeCategoryService
        .deleteRecipeCategory(this.id)
        .subscribe({
          next: (response) => {
            if (response.status === 204) {
              this.backClicked();
            }
          },
          error: (err) => this.errorMessages.push(err),
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
