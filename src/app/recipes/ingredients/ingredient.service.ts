import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIngredient } from './ingredient';
import { IIngredientAddRequest } from './ingredient-add-request';
import { IIngredientNoDesc } from './ingredient-no-desc';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  constructor(private http: HttpClient) {}

  getIngredient(id: string): Observable<IIngredient> {
    let url = `https://localhost:7049/api/ingredients/${id}`;
    return this.http.get<IIngredient>(url);
  }

  getIngredientsNoDesc(): Observable<IIngredientNoDesc[]> {
    let url = 'https://localhost:7049/api/ingredients/nodesc';
    return this.http.get<IIngredientNoDesc[]>(url);
  }

  editIngredient(ingredient: IIngredient): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/ingredients/${ingredient.id}`;
    return this.http.put(url, ingredient, { observe: 'response' });
  }

  addIngredient(ingredient: IIngredientAddRequest): Observable<IIngredient> {
    let url = 'https://localhost:7049/api/ingredients';
    return this.http.post<IIngredient>(url, ingredient);
  }
}
