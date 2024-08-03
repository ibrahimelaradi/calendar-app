import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type {
  UserDto,
  SignupParams,
} from '@calendar-app/schemas/dtos/auth.dto';
import { catchError, map, Observable, of, OperatorFunction } from 'rxjs';
import { ClientError } from './client-error';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/api'; // TODO Use environment configuration instead
  constructor(private client: HttpClient) {}

  signUp(values: SignupParams) {
    return this.client
      .post<void>(`${this.baseUrl}/auth/signup`, values, {
        withCredentials: true,
      })
      .pipe(catchError(ClientError.handleError));
  }

  profile() {
    return this.client
      .get<UserDto>(`${this.baseUrl}/auth/profile`, { withCredentials: true })
      .pipe(catchError(ClientError.handleError));
  }
}
