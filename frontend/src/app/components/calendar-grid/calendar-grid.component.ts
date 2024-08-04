import { Component } from '@angular/core';
import dayjs from 'dayjs';
import { FormatAsDatePipe } from '../../pipes/format-as-date.pipe';

type CalendarSlot = {
  date: dayjs.Dayjs;
  day: number;
  isOverflowingMonth?: boolean;
};

@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  imports: [FormatAsDatePipe],
  templateUrl: './calendar-grid.component.html',
  styleUrl: './calendar-grid.component.css',
})
export class CalendarGridComponent {
  calendarSlots: CalendarSlot[] = [];

  constructor() {
    this.createCalendarSlotsForMonth(dayjs());
  }

  createCalendarSlotsForMonth(date: dayjs.Dayjs) {
    const month = date.month();
    const firstDayOfMonth = dayjs(date).month(month).startOf('month').day();
    const monthDays = dayjs(date).month(month).daysInMonth();

    let previousMonthDays: number;
    if (month === 0) {
      previousMonthDays = dayjs(date)
        .subtract(1, 'year')
        .month(11)
        .daysInMonth();
    } else {
      previousMonthDays = dayjs(date)
        .month(month - 1)
        .daysInMonth();
    }

    this.calendarSlots = Array.from({ length: 7 * 5 }, (_, i) => {
      const day = i - firstDayOfMonth + 1;
      if (day <= 0) {
        return {
          date: dayjs(date)
            .subtract(1, 'month')
            .day(previousMonthDays + day),
          day: previousMonthDays + day,
          isOverflowingMonth: true,
        };
      }
      if (day > monthDays) {
        return {
          date: dayjs(date)
            .add(1, 'month')
            .day(day - monthDays),
          day: day - monthDays,
          isOverflowingMonth: true,
        };
      }
      return { date: dayjs(date).date(day), day };
    });
  }
}
