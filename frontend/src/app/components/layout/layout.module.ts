import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { LayoutComponent } from './layout/layout.component';
import { BarActionsComponent } from './bar-actions/bar-actions.component';
import { SideModalComponent } from './side-modal/side-modal.component';
import { InvitesListModule } from '../invites-list/invites-list.module';

@NgModule({
  declarations: [LayoutComponent, BarActionsComponent, SideModalComponent],
  imports: [CommonModule, TuiSvgModule, TuiButtonModule, InvitesListModule],
  exports: [LayoutComponent, BarActionsComponent, SideModalComponent],
})
export class LayoutModule {}
