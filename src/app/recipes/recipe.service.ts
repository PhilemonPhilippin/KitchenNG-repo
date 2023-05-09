import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from './recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipeUrl: string =
    'https://localhost:7049/api/recipes?pagenumber=1&pagesize=5&search=sandwich';
  constructor(private http: HttpClient) {}
  getRecipes(): Observable<IRecipe[]> {
    return this.http.get<IRecipe[]>(this.recipeUrl);
  }
}
