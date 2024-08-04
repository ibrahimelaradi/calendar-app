import { Component } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor() {}

  drawerOpen = false;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}
