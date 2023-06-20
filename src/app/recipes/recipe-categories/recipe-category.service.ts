import { HttpClient, HttpResponse } from '@angular/common/http';
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

  editRecipeCategory(
    recipeCategory: IRecipeCategory
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipecategories/${recipeCategory.id}`;
    return this.http.put(url, recipeCategory, { observe: 'response' });
  }
}
