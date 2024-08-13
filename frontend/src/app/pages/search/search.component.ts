import { Component, OnInit } from '@angular/core';
import { LayoutModule } from '../../components/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiPaginationModule } from '@taiga-ui/kit';
import {
  TuiModeModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ClientService } from '../../client/client.service';
import { EventDto } from '@calendar-app/schemas/dtos/events.dto';
import { Filters } from '@calendar-app/schemas/dtos/filters';
import { EventsListModule } from '../../components/events-list/events-list.module';
import { AsyncPipe } from '@angular/common';
import { EmptyArrayIfNullPipe } from '../../pipes/empty-array-if-null.pipe';
import { Paged } from '@calendar-app/schemas/dtos/common';
import { ItemCountPipe } from '../../pipes/item-count.pipe';
import { PageItemsPipe } from '../../pipes/page-items.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    LayoutModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiModeModule,
    EventsListModule,
    AsyncPipe,
    EmptyArrayIfNullPipe,
    ItemCountPipe,
    PageItemsPipe,
    TuiNotificationModule,
    TuiPaginationModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  events$!: Observable<Paged<EventDto>>;

  constructor(private client: ClientService) {}

  filters: Filters = {
    page: 1,
    pageSize: 10,
  };
  filters$ = new Subject<Filters>();
  onPageIndexChange(pageIndex: number) {
    this.filters$.next({ ...this.filters, page: pageIndex + 1 });
  }

  searchTerm$ = new Subject<string>();
  search(value: string) {
    this.searchTerm$.next(value);
  }
  getValue(ev: Event) {
    return (ev.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filters$.next({ ...this.filters, search: value });
      });
    this.events$ = this.filters$.pipe(
      tap((filters) => {
        this.filters = filters;
      }),
      switchMap((filters) => this.client.getEvents(filters))
    );
    // FIXME: This is a hack to trigger the fetch on page load
    setTimeout(() => this.filters$.next(this.filters), 50);
  }
}
