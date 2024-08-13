import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesListItemComponent } from './invites-list-item.component';

describe('InvitesListItemComponent', () => {
  let component: InvitesListItemComponent;
  let fixture: ComponentFixture<InvitesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitesListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
