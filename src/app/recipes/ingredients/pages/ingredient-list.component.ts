import { Component, OnDestroy, OnInit } from '@angular/core';
import { IIngredient } from '../../models/dtos/ingredient';
import { Subject, catchError, takeUntil } from 'rxjs';
import { IngredientService } from '../../services/ingredient.service';
import { IXPagination } from 'src/app/shared/pagination/xpagination';

@Component({
  templateUrl: 'ingredient-list.component.html',
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: IIngredient[] = [];
  errorMessage: string = '';
  currentPage: number = 1;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  totalItems: number = 1;
  displayAdd: boolean = false;
  addSuccessfull: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.getIngredients();
  }

  private extractPaginationHeader(paginationHeader: string | null): void {
    if (paginationHeader !== null) {
      let xPagination: IXPagination = JSON.parse(paginationHeader);
      this.totalPages = xPagination.TotalPageCount;
      this.totalItems = xPagination.TotalItemCount;
      this.currentPage = xPagination.PageNumber;
    }
  }

  private getIngredients(): void {
    this.errorMessage = '';
    this.ingredientService
      .getIngredients(this.pageNumber, this.pageSize)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.log('Error fecthing ingredient list: ' + err);
          this.errorMessage =
            'An error occurred while fetching ingredient list.';
          return [];
        })
      )
      .subscribe({
        next: (response) => {
          let responseBody: IIngredient[] | null = response.body;
          if (responseBody !== null) {
            this.ingredients = responseBody;
          }
          let paginationHeader: string | null =
            response.headers.get('X-Pagination');
          this.extractPaginationHeader(paginationHeader);
        },
      });
  }

  changePage(page: number): void {
    this.pageNumber = page;
    this.getIngredients();
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getIngredients();
  }

  toggleAdd(): void {
    this.displayAdd = !this.displayAdd;
  }

  onAddSuccessful(): void {
    this.getIngredients();
    this.addSuccessfull = true;
    setTimeout(() => {
      this.addSuccessfull = false;
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
