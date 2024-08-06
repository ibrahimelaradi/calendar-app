import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import dayjs from 'dayjs';
import { FormatAsDatePipe } from '../../../pipes/format-as-date.pipe';
import { AsyncPipe } from '@angular/common';
import { CalendarSlot } from '../calendar-grid.common';
import { CalendarGridItemComponent } from '../calendar-grid-item/calendar-grid-item.component';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import { hasIntersection, makeDayRange } from '../../../utils/dayjs';

@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [FormatAsDatePipe, AsyncPipe, CalendarGridItemComponent],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.css',
})
export class CalendarGridComponent implements OnChanges {
  @Input() month: number = dayjs().month();
  @Input() year: number = dayjs().year();
  @Input() events: EventDto[] = [];

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
          events: this.events.filter((e) =>
            hasIntersection(range, [dayjs(e.startDate), dayjs(e.endDate)])
          ),
        };
      }
      if (day > monthDays) {
        djs = date.add(1, 'month').date(day - monthDays);
        range = makeDayRange(djs);
        return {
          date: date.add(1, 'month').date(day - monthDays),
          day: day - monthDays,
          isOverflowingMonth: true,
          events: this.events.filter((e) =>
            hasIntersection(range, [dayjs(e.startDate), dayjs(e.endDate)])
          ),
        };
      }
      djs = date.date(day);
      range = makeDayRange(djs);
      return {
        date: date.date(day),
        day,
        events: this.events.filter((e) =>
          hasIntersection(range, [dayjs(e.startDate), dayjs(e.endDate)])
        ),
      };
    });
  }
}
