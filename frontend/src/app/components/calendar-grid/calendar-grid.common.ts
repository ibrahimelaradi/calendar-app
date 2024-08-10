import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import dayjs from 'dayjs';

export type CalendarSlot = {
  date: dayjs.Dayjs;
  day: number;
  isOverflowingMonth?: boolean;
  isToday?: boolean;
  events: EventDto[];
};
