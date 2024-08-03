import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { AuthModule } from './auth/auth.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    AuthModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'calendar-app-frontend';
}
