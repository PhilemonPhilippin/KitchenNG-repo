import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeCategory } from './recipe-category';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeCategoryService {
  constructor(private http: HttpClient) {}

  getRecipeCategory(id: string): Observable<IRecipeCategory> {
    let url = `https://localhost:7049/api/recipecategories/${id}`;
    return this.http.get<IRecipeCategory>(url);
  }
}
