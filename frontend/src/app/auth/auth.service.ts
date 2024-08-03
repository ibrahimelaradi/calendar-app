import { Injectable } from '@angular/core';
import { ClientService } from '../client/client.service';
import {
  LoginParams,
  SignupParams,
  UserDto,
} from '@calendar-app/schemas/dtos/auth.dto';
import { first, map, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  profile: Observable<UserDto>;
  constructor(private client: ClientService) {
    this.profile = this.client.profile();
  }

  signUp(values: SignupParams) {
    return this.client.signUp(values);
  }

  logIn(values: LoginParams) {
    return this.client.logIn(values);
  }
}
