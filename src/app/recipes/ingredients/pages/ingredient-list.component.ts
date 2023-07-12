import { Component, OnDestroy, OnInit } from '@angular/core';
import { IIngredient } from '../models/ingredient';
import { Subscription } from 'rxjs';
import { IngredientService } from '../ingredient.service';
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
  sub!: Subscription;
  displayAdd: boolean = false;

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
    this.sub = this.ingredientService
      .getIngredients(this.pageNumber, this.pageSize)
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
        error: (err) => (this.errorMessage = err),
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

  refresh(): void {
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
