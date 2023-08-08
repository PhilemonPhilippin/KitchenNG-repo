import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPreparationStep } from '../models/dtos/preparation-step';
import { IPreparationStepRequest } from '../models/requests/preparation-step-request';

@Injectable({ providedIn: 'root' })
export class PreparationStepService {
  constructor(private http: HttpClient) {}

  getPreparationSteps(recipeId: number): Observable<IPreparationStep[]> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps`;
    return this.http.get<IPreparationStep[]>(url);
  }

  getPreparationStep(
    id: number,
    recipeId: number
  ): Observable<IPreparationStep> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/${id}`;
    return this.http.get<IPreparationStep>(url);
  }

  editPreparationStep(
    id: number,
    recipeId: number,
    preparationStep: IPreparationStepRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/${id}`;
    return this.http.put(url, preparationStep, { observe: 'response' });
  }

  addPreparationStep(
    recipeId: number,
    preparationStep: IPreparationStepRequest
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/`;
    return this.http.post(url, preparationStep, { observe: 'response' });
  }

  deletePreparationStep(
    id: number,
    recipeId: number
  ): Observable<HttpResponse<Object>> {
    let url = `https://localhost:7049/api/recipes/${recipeId}/preparationsteps/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
}
