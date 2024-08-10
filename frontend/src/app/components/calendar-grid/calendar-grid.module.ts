import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';
import { CalendarGridItemComponent } from './calendar-grid-item/calendar-grid-item.component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [CalendarGridComponent, CalendarGridItemComponent],
})
export class CalendarGridModule {}
