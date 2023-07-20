import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RecipeCategoryService } from '../recipe-category.service';

@Component({
  templateUrl: './recipe-category.component.html',
})
export class RecipeCategoryComponent implements OnInit, OnDestroy {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  editSuccessful: boolean = false;
  id: number = 0;
  statusCode: number = 0;
  errorMessage: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private recipeCategoryService: RecipeCategoryService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }

  onEditSuccess(): void {
    this.editSuccessful = true;
  }

  deleteClicked() {
    if (this.id) {
      this.errorMessage = '';
      this.statusCode = 0;
      this.recipeCategoryService
        .deleteRecipeCategory(this.id)
        .pipe(
          catchError((err) => {
            console.log('Error deleting the category: ' + err);
            this.errorMessage =
              'An error occurred while deleting the category.';
            return EMPTY;
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: (response) => {
            this.statusCode = response.status;
            if (response.status === 204) {
              this.backClicked();
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
