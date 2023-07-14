import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipeIngredient } from './models/recipe-ingredient';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IRecipeIngredientAddRequest } from './models/recipe-ingredient-add-request';
import { IRecipeIngredientEditRequest } from './models/recipe-ingredient-edit-request';

@Injectable({ providedIn: 'root' })
export class RecipeIngredientService {
  constructor(private http: HttpClient) {}

  getRecipeIngredients(recipeId: number): Observable<IRecipeIngredient[]> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients`;
    return this.http.get<IRecipeIngredient[]>(url);
  }

  addRecipeIngredient(
    recipeId: number,
    recipeIngredient: IRecipeIngredientAddRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients`;
    return this.http.post(url, recipeIngredient, { observe: 'response' });
  }

  editRecipeIngredient(
    recipeId: number,
    ingredientId: number,
    recipeIngredient: IRecipeIngredientEditRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients/${ingredientId}`;
    return this.http.put(url, recipeIngredient, { observe: 'response' });
  }

  removeRecipeIngredient(
    recipeId: number,
    ingredientId: number
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/recipeingredients/${ingredientId}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
