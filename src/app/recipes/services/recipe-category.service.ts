import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipeCategory } from '../models/dtos/recipe-category';
import { Injectable } from '@angular/core';
import { IRecipeCategoryRequest } from '../models/requests/recipe-category-request';

@Injectable({ providedIn: 'root' })
export class RecipeCategoryService {
  constructor(private http: HttpClient) {}

  getRecipeCategories(): Observable<IRecipeCategory[]> {
    let url = 'https://localhost:7049/api/recipecategories';
    return this.http.get<IRecipeCategory[]>(url);
  }

  getRecipeCategory(id: number): Observable<IRecipeCategory> {
    let url = `https://localhost:7049/api/recipecategories/${id}`;
    return this.http.get<IRecipeCategory>(url);
  }

  editRecipeCategory(
    id: number,
    recipeCategory: IRecipeCategoryRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipecategories/${id}`;
    return this.http.put(url, recipeCategory, { observe: 'response' });
  }

  addRecipeCategory(
    recipeCategory: IRecipeCategoryRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipecategories`;
    return this.http.post(url, recipeCategory, { observe: 'response' });
  }

  deleteRecipeCategory(id: number): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipecategories/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
