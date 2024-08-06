import { Component, Input } from '@angular/core';
import { CalendarSlot } from '../calendar-grid.common';
import { FormatAsDatePipe } from '../../../pipes/format-as-date.pipe';
import { filter, map } from 'rxjs';
import dayjs from 'dayjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-calendar-grid-item',
  standalone: true,
  imports: [FormatAsDatePipe, AsyncPipe],
  templateUrl: './calendar-grid-item.component.html',
  styleUrl: './calendar-grid-item.component.css',
})
export class CalendarGridItemComponent {
  @Input()
  slot!: CalendarSlot;
}
