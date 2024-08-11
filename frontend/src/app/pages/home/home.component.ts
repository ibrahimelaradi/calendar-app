import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CalendarGridComponent } from '../../components/calendar-grid/calendar-grid/calendar-grid.component';
import {
  CreateEventParams,
  EventDto,
  UpdateEventParams,
} from '@calendar-app/schemas/dtos/events.dto';
import { map, Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ClientService } from '../../client/client.service';
import { EmptyArrayIfNullPipe } from '../../pipes/empty-array-if-null.pipe';
import { CalendarSlot } from '../../components/calendar-grid/calendar-grid.common';
import dayjs from 'dayjs';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { CalendarGridModule } from '../../components/calendar-grid/calendar-grid.module';
import { EventsListModule } from '../../components/events-list/events-list.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    TuiButtonModule,
    AsyncPipe,
    EmptyArrayIfNullPipe,
    EventFormComponent,
    CalendarGridModule,
    EventsListModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  events$!: Observable<EventDto[]>;

  view: 'calendar' | 'list' = 'calendar';
  onToggleView() {
    this.view = this.view === 'calendar' ? 'list' : 'calendar';
  }

  month: number = dayjs().month();
  year: number = dayjs().year();
  onChangeDisplayDate([month, year]: [number, number]) {
    this.month = month;
    this.year = year;
    this.fetchEventsBasedOnCurrentRange();
  }

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

  fetchEventsBasedOnCurrentRange() {
    this.events$ = this.client.getCalendarEvents({
      fromDate: dayjs()
        .month(this.month)
        .year(this.year)
        .startOf('month')
        .format(),
      toDate: dayjs().month(this.month).year(this.year).endOf('month').format(),
    });
  }

  ngOnInit(): void {
    this.fetchEventsBasedOnCurrentRange();
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
    this.client.createEvent(values).subscribe({
      complete: () => {
        this.fetchEventsBasedOnCurrentRange();
        this.closeEventFormSidebar();
      },
    });
  }

  onUpdateEventSubmit(id: string, values: UpdateEventParams) {
    this.client.updateEvent(id, values).subscribe({
      complete: () => {
        this.fetchEventsBasedOnCurrentRange();
        this.closeEventFormSidebar();
      },
    });
  }

  onEventFormSubmit(values: CreateEventParams | UpdateEventParams) {
    if (this.lastSelectedEvent) {
      this.onUpdateEventSubmit(
        this.lastSelectedEvent.id,
        values as UpdateEventParams
      );
      return;
    }
    this.onCreateEventSubmit(values as CreateEventParams);
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
