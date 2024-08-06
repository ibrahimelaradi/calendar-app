import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CalendarGridComponent } from '../../components/calendar-grid/calendar-grid/calendar-grid.component';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ClientService } from '../../client/client.service';
import { EmptyArrayIfNullPipe } from '../../pipes/empty-array-if-null.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    CalendarGridComponent,
    AsyncPipe,
    EmptyArrayIfNullPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  events$!: Observable<EventDto[]>;
  constructor(
    private router: Router,
    private auth: AuthService,
    private client: ClientService
  ) {}

  ngOnInit(): void {
    this.events$ = this.client.getEvents({});
  }

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
