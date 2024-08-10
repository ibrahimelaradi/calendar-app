import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsListItemComponent } from './events-list-item/events-list-item.component';
import { FormatAsDatePipe } from '../../pipes/format-as-date.pipe';

@NgModule({
  declarations: [EventsListComponent, EventsListItemComponent],
  imports: [CommonModule, FormatAsDatePipe],
  exports: [EventsListComponent],
})
export class EventsListModule {}
