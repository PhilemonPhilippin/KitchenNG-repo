import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeCategory } from './recipe-category';
import { Injectable } from '@angular/core';
import { IRecipeCategoryAddRequest } from './recipe-category-add-request';

@Injectable({ providedIn: 'root' })
export class RecipeCategoryService {
  constructor(private http: HttpClient) {}

  getRecipeCategories(): Observable<IRecipeCategory[]> {
    let url = 'https://localhost:7049/api/recipecategories';
    return this.http.get<IRecipeCategory[]>(url);
  }

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

  addRecipeCategory(
    recipeCategory: IRecipeCategoryAddRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipecategories`;
    return this.http.post(url, recipeCategory, { observe: 'response' });
  }

  deleteRecipeCategory(id: string): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipecategories/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
