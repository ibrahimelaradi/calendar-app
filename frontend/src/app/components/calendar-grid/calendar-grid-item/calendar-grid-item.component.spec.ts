import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarGridItemComponent } from './calendar-grid-item.component';

describe('CalendarGridItemComponent', () => {
  let component: CalendarGridItemComponent;
  let fixture: ComponentFixture<CalendarGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarGridItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
