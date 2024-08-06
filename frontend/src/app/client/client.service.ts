import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type {
  LoginParams,
  SignupParams,
  UserDto,
} from '@calendar-app/schemas/dtos/auth.dto';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import { Filters } from '@calendar-app/schemas/dtos/filters';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:3000/api'; // TODO Use environment configuration instead
  constructor(private client: HttpClient) {}

  signUp(values: SignupParams) {
    return this.client.post<void>(`${this.baseUrl}/auth/signup`, values);
  }

  logIn(values: LoginParams) {
    return this.client.post<void>(`${this.baseUrl}/auth/login`, values);
  }

  refresh() {
    return this.client.post<void>(`${this.baseUrl}/auth/refresh`, null, {
      withCredentials: true,
    });
  }

  logOut() {
    return this.client.post<void>(`${this.baseUrl}/auth/logout`, null);
  }

  profile() {
    return this.client.get<UserDto>(`${this.baseUrl}/auth/profile`);
  }

  getEvents(filters: Filters) {
    return this.client.get<EventDto[]>(`${this.baseUrl}/events`, {
      params: filters,
    });
  }
}
