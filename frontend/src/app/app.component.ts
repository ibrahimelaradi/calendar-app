import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TUI_DATE_TIME_VALUE_TRANSFORMER } from '@taiga-ui/kit';
import { AuthModule } from './auth/auth.module';
import { DateTimeTransformer } from './utils/tui';

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
  providers: [
    {
      provide: TUI_DATE_TIME_VALUE_TRANSFORMER,
      useClass: DateTimeTransformer,
    },
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'calendar-app-frontend';
}
