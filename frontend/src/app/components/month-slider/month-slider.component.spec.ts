import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSliderComponent } from './month-slider.component';

describe('MonthSliderComponent', () => {
  let component: MonthSliderComponent;
  let fixture: ComponentFixture<MonthSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
