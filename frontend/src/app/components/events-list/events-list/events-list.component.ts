import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnChanges {
  @Input() events: EventDto[] = [];

  @Output() eventClick = new EventEmitter<EventDto>();
  onEventClick(event: EventDto) {
    this.eventClick.emit(event);
  }

  groups: [date: string, events: EventDto[]][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('events')) {
      this.groupEventsByDate();
    }
  }

  groupEventsByDate() {
    this.groups = this.events.reduce((acc, event) => {
      const date = dayjs(event.startDate).format('dddd, MMMM Do');
      const group = acc.find(([groupDate]) => groupDate === date);
      if (group) {
        group[1].push(event);
      } else {
        acc.push([date, [event]]);
      }
      return acc;
    }, [] as [string, EventDto[]][]);
  }
}
