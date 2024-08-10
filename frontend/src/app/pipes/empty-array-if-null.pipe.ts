import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyArrayIfNull',
  standalone: true,
})
export class EmptyArrayIfNullPipe implements PipeTransform {
  transform<T>(value: T[] | null, ...args: unknown[]): T[] {
    return !value ? [] : value;
  }
}
