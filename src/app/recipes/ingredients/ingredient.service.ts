import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIngredient } from './models/ingredient';
import { IIngredientNoDesc } from './models/ingredient-no-desc';
import { IIngredientRequest } from './models/ingredient-request';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  constructor(private http: HttpClient) {}

  getIngredients(
    pageNumber: number,
    pageSize: number
  ): Observable<HttpResponse<IIngredient[]>> {
    let url: string = `https://localhost:7049/api/ingredients?pagenumber=${pageNumber}&pagesize=${pageSize}`;
    return this.http.get<IIngredient[]>(url, { observe: 'response' });
  }

  getIngredient(id: number): Observable<IIngredient> {
    let url = `https://localhost:7049/api/ingredients/${id}`;
    return this.http.get<IIngredient>(url);
  }

  getIngredientsNoDesc(): Observable<IIngredientNoDesc[]> {
    let url = 'https://localhost:7049/api/ingredients/nodescription';
    return this.http.get<IIngredientNoDesc[]>(url);
  }

  nameExist(name: string): Observable<boolean> {
    let url = `https://localhost:7049/api/ingredients/exist/${name}`;
    return this.http.get<boolean>(url);
  }

  editIngredient(
    id: number,
    ingredient: IIngredientRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/ingredients/${id}`;
    return this.http.put(url, ingredient, { observe: 'response' });
  }

  addIngredient(ingredient: IIngredientRequest): Observable<IIngredient> {
    let url = 'https://localhost:7049/api/ingredients';
    return this.http.post<IIngredient>(url, ingredient);
  }

  deleteIngredient(id: number): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/ingredients/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
