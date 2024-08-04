import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CalendarGridComponent } from '../../components/calendar-grid/calendar-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, CalendarGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router, private auth: AuthService) {}

  onLogOutClick() {
    const router = this.router;
    this.auth.logOut().subscribe({
      complete() {
        router.navigate(['/signin'], { replaceUrl: true });
      },
      error(err) {
        // TODO Handle error
      },
    });
  }
}
