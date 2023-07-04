import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPreparationStep } from './preparation-step';
import { IPreparationStepAddRequest } from './preparation-step-add-request';

@Injectable({ providedIn: 'root' })
export class PreparationStepService {
  constructor(private http: HttpClient) {}

  getPreparationSteps(recipeId: string): Observable<IPreparationStep[]> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps`;
    return this.http.get<IPreparationStep[]>(url);
  }

  getPreparationStep(
    id: string,
    recipeId: string
  ): Observable<IPreparationStep> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/${id}`;
    return this.http.get<IPreparationStep>(url);
  }

  editPreparationStep(
    preparationStep: IPreparationStep
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${preparationStep.recipeId}/preparationsteps/${preparationStep.id}`;
    return this.http.put(url, preparationStep, { observe: 'response' });
  }

  addPreparationStep(
    recipeId: string,
    preparationStep: IPreparationStepAddRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/`;
    return this.http.post(url, preparationStep, { observe: 'response' });
  }

  deletePreparationStep(id:string, recipeId: string): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
