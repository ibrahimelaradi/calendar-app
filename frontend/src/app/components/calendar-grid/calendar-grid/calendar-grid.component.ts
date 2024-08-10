import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import dayjs from 'dayjs';
import { FormatAsDatePipe } from '../../../pipes/format-as-date.pipe';
import { AsyncPipe } from '@angular/common';
import { CalendarSlot } from '../calendar-grid.common';
import { CalendarGridItemComponent } from '../calendar-grid-item/calendar-grid-item.component';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import { hasIntersection, makeDayRange } from '../../../utils/dayjs';

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.css',
})
export class CalendarGridComponent implements OnChanges {
  @Input() month: number = dayjs().month();
  @Input() year: number = dayjs().year();
  @Input() events: EventDto[] = [];
  @Output() slotClick = new EventEmitter<dayjs.Dayjs>();
  @Output() eventClick = new EventEmitter<EventDto>();

  calendarSlots: CalendarSlot[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const changedProps = Object.keys(changes);
    if (
      changedProps.includes('month') ||
      changedProps.includes('year') ||
      changedProps.includes('events')
    ) {
      this.createCalendarSlotsForMonth();
    }
  }

  createCalendarSlotsForMonth() {
    const today = dayjs();

    const date = dayjs().month(this.month).year(this.year);
    const firstDayOfMonth = date.startOf('month').day();
    const monthDays = date.daysInMonth();

    let previousMonthDays: number;
    if (this.month === 0) {
      previousMonthDays = date.subtract(1, 'year').month(11).daysInMonth();
    } else {
      previousMonthDays = date.month(this.month - 1).daysInMonth();
    }

    this.calendarSlots = Array.from({ length: 7 * 5 }, (_, i) => {
      let djs: dayjs.Dayjs;
      let range: [dayjs.Dayjs, dayjs.Dayjs];
      const day = i - firstDayOfMonth + 1;
      if (day <= 0) {
        djs = date
          .subtract(1, 'month')
          .date(previousMonthDays + day)
          .startOf('day');
        range = makeDayRange(djs);
        return {
          date: djs,
          day: previousMonthDays + day,
          isOverflowingMonth: true,
          isToday: today.isBefore(djs.endOf('day')) && today.isAfter(djs),
          events: this.events.filter((e) =>
            hasIntersection(range, [dayjs(e.startDate), dayjs(e.endDate)])
          ),
        };
      }
      if (day > monthDays) {
        djs = date
          .add(1, 'month')
          .date(day - monthDays)
          .startOf('day');
        range = makeDayRange(djs);
        return {
          date: djs,
          day: day - monthDays,
          isOverflowingMonth: true,
          isToday: today.isBefore(djs.endOf('day')) && today.isAfter(djs),
          events: this.events.filter((e) =>
            hasIntersection(range, [dayjs(e.startDate), dayjs(e.endDate)])
          ),
        };
      }
      djs = date.date(day).startOf('day');
      range = makeDayRange(djs);
      return {
        date: date.date(day),
        day,
        isToday: today.isBefore(djs.endOf('day')) && today.isAfter(djs),
        events: this.events.filter((e) =>
          hasIntersection(range, [dayjs(e.startDate), dayjs(e.endDate)])
        ),
      };
    });
  }

  onSlotClick(date: dayjs.Dayjs) {
    this.slotClick.emit(date);
  }
}
