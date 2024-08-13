import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { LayoutComponent } from './layout/layout.component';
import { BarActionsComponent } from './bar-actions/bar-actions.component';

@NgModule({
  declarations: [LayoutComponent, BarActionsComponent],
  imports: [CommonModule, TuiSvgModule, TuiButtonModule],
  exports: [LayoutComponent, BarActionsComponent],
})
export class LayoutModule {}
