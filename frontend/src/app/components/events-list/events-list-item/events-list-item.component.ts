import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import dayjs from 'dayjs';

@Component({
  selector: 'app-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrl: './events-list-item.component.css',
})
export class EventsListItemComponent {
  @Input({ required: true }) event!: EventDto;
  @Output() click = new EventEmitter();

  get isSameDayEvent() {
    return (
      dayjs(this.event.startDate).startOf('day').format() ===
      dayjs(this.event.endDate).startOf('day').format()
    );
  }
}
