import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePromptComponent } from './invite-prompt.component';

describe('InvitePromptComponent', () => {
  let component: InvitePromptComponent;
  let fixture: ComponentFixture<InvitePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitePromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
