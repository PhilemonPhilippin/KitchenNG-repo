import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from './recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}
  getRecipes(
    pageNumber: number,
    pageSize: number,
    searchQuery: string
  ): Observable<HttpResponse<IRecipe[]>> {
    let recipeUrl: string = '';
    if (searchQuery == undefined) {
      recipeUrl = `https://localhost:7049/api/recipes?pagenumber=${pageNumber}&pagesize=${pageSize}`;
    } else if (searchQuery != undefined) {
      recipeUrl = `https://localhost:7049/api/recipes?pagenumber=${pageNumber}&pagesize=${pageSize}&searchquery=${searchQuery}`;
    }
    return this.http.get<IRecipe[]>(recipeUrl, { observe: 'response' });
  }
}
