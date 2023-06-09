import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIngredient } from './ingredient';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  constructor(private http: HttpClient) {}

  getIngredient(id: string): Observable<IIngredient> {
    let url = `https://localhost:7049/api/ingredients/${id}`;
    return this.http.get<IIngredient>(url);
  }

  editIngredient(
    ingredient: IIngredient
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/ingredients/${ingredient.id}`;
    return this.http.put(url, ingredient, { observe: 'response' });
  }
}
