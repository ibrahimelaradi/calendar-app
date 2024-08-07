import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
