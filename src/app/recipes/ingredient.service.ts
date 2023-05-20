import { HttpClient } from '@angular/common/http';
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
}
