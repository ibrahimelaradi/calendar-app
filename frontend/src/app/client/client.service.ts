import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type {
  LoginParams,
  SignupParams,
  UserDto,
} from '@calendar-app/schemas/dtos/auth.dto';
import { Paged } from '@calendar-app/schemas/dtos/common';
import {
  CreateEventParams,
  EventDto,
} from '@calendar-app/schemas/dtos/events.dto';
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

  getCalendarEvents(filters: Filters) {
    return this.client.get<EventDto[]>(`${this.baseUrl}/events/calendar`, {
      params: filters as Record<string, string>,
    });
  }

  getEvents(filters: Filters) {
    return this.client.get<Paged<EventDto>>(`${this.baseUrl}/events/search`, {
      params: filters as Record<string, string>,
    });
  }

  createEvent(values: CreateEventParams) {
    return this.client.post<EventDto>(`${this.baseUrl}/events`, values);
  }

  updateEvent(id: string, values: CreateEventParams) {
    return this.client.put<EventDto>(`${this.baseUrl}/events/${id}`, values);
  }
}
