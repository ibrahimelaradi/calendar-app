import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'formatAsDate',
  standalone: true,
})
export class FormatAsDatePipe implements PipeTransform {
  transform(value: string | Date | dayjs.Dayjs, ...args: unknown[]): string {
    return dayjs(value).format('MMM, D');
  }
}
