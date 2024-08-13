import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarActionsComponent } from './bar-actions.component';

describe('BarActionsComponent', () => {
  let component: BarActionsComponent;
  let fixture: ComponentFixture<BarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
