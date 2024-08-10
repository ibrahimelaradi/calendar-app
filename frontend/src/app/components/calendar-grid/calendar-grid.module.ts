import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { CalendarGridItemComponent } from './calendar-grid-item/calendar-grid-item.component';
import { FormatAsDatePipe } from '../../pipes/format-as-date.pipe';

@NgModule({
  declarations: [CalendarGridItemComponent, CalendarGridComponent],
  imports: [CommonModule, FormatAsDatePipe, AsyncPipe],
  exports: [CalendarGridComponent],
})
export class CalendarGridModule {}
