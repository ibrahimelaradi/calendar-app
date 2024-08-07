import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarSlot } from '../calendar-grid.common';
import { FormatAsDatePipe } from '../../../pipes/format-as-date.pipe';
import { AsyncPipe } from '@angular/common';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';

@Component({
  selector: 'app-calendar-grid-item',
  standalone: true,
  imports: [FormatAsDatePipe, AsyncPipe],
  templateUrl: './calendar-grid-item.component.html',
  styleUrl: './calendar-grid-item.component.css',
})
export class CalendarGridItemComponent {
  @Input() slot!: CalendarSlot;
  @Output() click = new EventEmitter();
  @Output() eventClick = new EventEmitter<EventDto>();

  onClick() {
    this.click.emit();
  }

  onEventClick(ev: MouseEvent, data: EventDto) {
    ev.stopPropagation();
    this.eventClick.emit(data);
  }
}
