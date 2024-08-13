import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InvitesListComponent } from './invites-list/invites-list.component';
import { InvitesListItemComponent } from './invites-list-item/invites-list-item.component';
import { EmptyArrayIfNullPipe } from '../../pipes/empty-array-if-null.pipe';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [InvitesListComponent, InvitesListItemComponent],
  imports: [CommonModule, AsyncPipe, EmptyArrayIfNullPipe, TuiButtonModule],
  exports: [InvitesListComponent],
})
export class InvitesListModule {}
