import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { Address } from '../models/address';
import { Step } from '../models/step';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = isDevMode() ? 'https://tripmateapi.azurewebsites.net/api/' : 'https://tripmateapi.azurewebsites.net/api/';

  constructor(private _http: HttpClient) { }

  login(email: string, password: string): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(`${this.url}users/login`, {email, password});
  }

  register(email: string, lastName: string, firstName: string, password: string, confirmPassword: string): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(`${this.url}users/register`, {email, lastName, firstName, password, confirmPassword});
  }

  createRoute(steps: Step[]) {
    return this._http.post<ApiResponse>(`${this.url}trajets`, {steps});
  }

  getTrajets(): Observable<ApiResponse> {
    return this._http.get<ApiResponse>(`${this.url}trajets/users`);
  }

  search(positionDepart: Address | null, positionArrival: Address | null, minDepartTime: string | null): Observable<ApiResponse> {
    return this._http.post<ApiResponse>(`${this.url}trajets/query`, {positionDepart, positionArrival, minDepartTime});
  }
}
