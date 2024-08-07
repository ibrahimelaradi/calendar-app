import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CalendarGridComponent } from '../../components/calendar-grid/calendar-grid/calendar-grid.component';
import {
  CreateEventParams,
  EventDto,
} from '@calendar-app/schemas/dtos/events.dto';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ClientService } from '../../client/client.service';
import { EmptyArrayIfNullPipe } from '../../pipes/empty-array-if-null.pipe';
import { CalendarSlot } from '../../components/calendar-grid/calendar-grid.common';
import dayjs from 'dayjs';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    CalendarGridComponent,
    TuiButtonModule,
    AsyncPipe,
    EmptyArrayIfNullPipe,
    EventFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  events$!: Observable<EventDto[]>;

  lastSelectedEvent?: EventDto;
  lastSelectedDate?: dayjs.Dayjs;

  eventFormOpen = false;
  openEventFormSidebar() {
    this.eventFormOpen = true;
  }
  closeEventFormSidebar() {
    this.eventFormOpen = false;
    this.lastSelectedDate = undefined;
    this.lastSelectedEvent = undefined;
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private client: ClientService
  ) {}

  ngOnInit(): void {
    this.events$ = this.client.getEvents({});
  }

  onCalendarSlotClick(date: dayjs.Dayjs) {
    this.lastSelectedDate = date;
    this.openEventFormSidebar();
  }

  onEventClick(event: EventDto) {
    this.lastSelectedEvent = event;
    this.openEventFormSidebar();
  }

  onCreateEventSubmit(values: CreateEventParams) {
    this.events$ = this.client
      .createEvent(values)
      .pipe(switchMap(() => this.client.getEvents({})));

    this.events$.subscribe({
      complete: () => this.closeEventFormSidebar(),
      error(err) {
        // TODO Handle error
      },
    });
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
