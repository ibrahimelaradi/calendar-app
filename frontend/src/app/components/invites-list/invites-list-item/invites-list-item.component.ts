import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InviteDto } from '@calendar-app/schemas/dtos/invites.dto';

@Component({
  selector: 'app-invites-list-item',
  templateUrl: './invites-list-item.component.html',
  styleUrl: './invites-list-item.component.css',
})
export class InvitesListItemComponent {
  @Input({ required: true }) invite!: InviteDto;

  @Output() accept = new EventEmitter();
  @Output() reject = new EventEmitter();
  onAccept() {
    this.accept.emit();
  }

  onReject() {
    this.reject.emit();
  }
}
