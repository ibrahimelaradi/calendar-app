import { Component } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TuiSvgModule, TuiButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private auth: AuthService, private router: Router) {}

  drawerOpen = true;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  onLogout() {
    this.auth.logOut().subscribe({
      complete: () => this.router.navigate(['/signin'], { replaceUrl: true }),
    });
  }
}
