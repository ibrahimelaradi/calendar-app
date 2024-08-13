import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  @Input() sideModalOpen = false;
  @Output() backdropClick = new EventEmitter();

  constructor(private auth: AuthService, private router: Router) {}

  drawerOpen = true;
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  onBackdropClick() {
    this.backdropClick.emit();
  }

  onLogout() {
    this.auth.logOut().subscribe({
      complete: () => this.router.navigate(['/signin'], { replaceUrl: true }),
    });
  }
}
