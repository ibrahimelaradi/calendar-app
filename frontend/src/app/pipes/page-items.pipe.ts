import { Pipe, PipeTransform } from '@angular/core';
import { Paged } from '@calendar-app/schemas/dtos/common';

@Pipe({
  name: 'pageItems',
  standalone: true,
})
export class PageItemsPipe implements PipeTransform {
  transform<T>(value: Paged<T> | null, ...args: unknown[]): T[] | null {
    return value?.items || null;
  }
}
