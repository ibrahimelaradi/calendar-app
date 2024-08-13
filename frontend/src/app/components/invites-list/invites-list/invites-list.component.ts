import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InviteDto } from '@calendar-app/schemas/dtos/invites.dto';
import { Observable } from 'rxjs';
import { ClientService } from '../../../client/client.service';
import { ClientError } from '../../../client/client-error';

@Component({
  selector: 'app-invites-list',
  templateUrl: './invites-list.component.html',
  styleUrl: './invites-list.component.css',
})
export class InvitesListComponent implements OnInit {
  invites$!: Observable<InviteDto[]>;

  @Output() inviteAccepted = new EventEmitter();

  constructor(private client: ClientService) {}

  fetchInvites() {
    this.invites$ = this.client.getInvites({ inviteStatus: 'pending' });
  }

  ngOnInit() {
    this.fetchInvites();
  }

  onAcceptInvite(inviteId: string) {
    this.client.acceptInvite(inviteId).subscribe({
      complete: () => {
        this.fetchInvites();
        this.inviteAccepted.emit();
        alert('Invite accepted!');
      },
      error: (err) => {
        if (err instanceof ClientError) {
          alert(err.message);
        }
      },
    });
  }
  onRejectInvite(inviteId: string) {
    this.client.rejectInvite(inviteId).subscribe({
      complete: () => {
        this.fetchInvites();
        alert('Invite rejected!');
      },
      error: (err) => {
        if (err instanceof ClientError) {
          alert(err.message);
        }
      },
    });
  }
}
