import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeIngredient } from './recipe-ingredient';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IRecipeIngredientAddRequest } from './recipe-ingredient-add-request';

@Injectable({ providedIn: 'root' })
export class RecipeIngredientService {
  constructor(private http: HttpClient) {}

  getRecipeIngredients(recipeId: string): Observable<IRecipeIngredient[]> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients`;
    return this.http.get<IRecipeIngredient[]>(url);
  }

  addRecipeIngredient(
    recipeId: string,
    recipeIngredient: IRecipeIngredientAddRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients`;
    return this.http.post(url, recipeIngredient, { observe: 'response' });
  }

  removeRecipeIngredient(
    recipeId: string,
    ingredientId: string
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients/${ingredientId}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
