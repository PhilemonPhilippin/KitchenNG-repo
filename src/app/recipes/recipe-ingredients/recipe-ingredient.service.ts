import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeIngredient } from './recipe-ingredient';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipeIngredientService {
  constructor(private http: HttpClient) {}

  getRecipeIngredients(recipeId: string): Observable<IRecipeIngredient[]> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients`;
    return this.http.get<IRecipeIngredient[]>(url);
  }
}
