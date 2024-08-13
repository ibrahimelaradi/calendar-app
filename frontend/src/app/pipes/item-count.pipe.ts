import { Pipe, PipeTransform } from '@angular/core';
import { Paged } from '@calendar-app/schemas/dtos/common';

@Pipe({
  name: 'itemCount',
  standalone: true,
})
export class ItemCountPipe implements PipeTransform {
  transform<T>(value: Paged<T> | null, ...args: unknown[]): number {
    return value?.count || 0;
  }
}
