import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'formatAsDate',
  standalone: true,
})
export class FormatAsDatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return dayjs.isDayjs(value) ? dayjs(value).format('MMM, D') : value;
  }
}
