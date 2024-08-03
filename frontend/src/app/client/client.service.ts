import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type {
  UserDto,
  SignupParams,
  LoginParams,
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
    return this.client.post(`${this.baseUrl}/auth/signup`, values);
  }

  logIn(values: LoginParams) {
    return this.client.post(`${this.baseUrl}/auth/login`, values);
  }

  refresh() {
    return this.client.post(`${this.baseUrl}/auth/refresh`, null, {
      withCredentials: true,
    });
  }

  logOut() {
    return this.client.post(`${this.baseUrl}/auth/logout`, null);
  }

  profile() {
    return this.client.get<UserDto>(`${this.baseUrl}/auth/profile`);
  }
}
