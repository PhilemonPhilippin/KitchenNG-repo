import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent implements OnInit, OnDestroy {
  displayDetail: boolean = true;
  displayEdit: boolean = false;
  id: string = '';
  errorMessages: string[] = [];
  sub!: Subscription;

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
  }

  toggleEdit(): void {
    this.displayDetail = !this.displayDetail;
    this.displayEdit = !this.displayEdit;
  }

  backClicked() {
    this._location.back();
  }

  deleteClicked(id: string): void {
    this.sub = this.ingredientService.deleteIngredient(id).subscribe({
      next: (response) => {
        if (response.status === 204) {
          this._location.back();
        }
      },
      error: (err) => this.errorMessages.push(err),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
