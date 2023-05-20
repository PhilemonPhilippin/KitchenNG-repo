import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPreparationStep } from './preparation-step';

@Injectable({ providedIn: 'root' })
export class PreparationStepService {
  constructor(private http: HttpClient) {}

  getPreparationSteps(recipeId: string): Observable<IPreparationStep[]> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps`;
    return this.http.get<IPreparationStep[]>(url);
  }

  getPreparationStep(id: string, recipeId: string): Observable<IPreparationStep> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/${id}`;
    return this.http.get<IPreparationStep>(url);
  }
}
