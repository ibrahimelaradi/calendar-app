import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientModule } from '../client/client.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClientModule],
  providers: [AuthService],
})
export class AuthModule {}
