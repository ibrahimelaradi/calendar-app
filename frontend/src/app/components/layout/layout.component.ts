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
import dayjs from 'dayjs';

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

  @Input() month: number = dayjs().month();
  @Input() year: number = dayjs().year();
  @Output() dateChange = new EventEmitter<[month: number, year: number]>();

  @Input() view: 'calendar' | 'list' = 'calendar';
  @Output() toggleView = new EventEmitter();
  onToggleView() {
    this.toggleView.emit();
  }

  get dateDisplay() {
    return dayjs().month(this.month).year(this.year).format('MMMM YYYY');
  }
  incrementDate() {
    const date = dayjs().month(this.month).year(this.year).add(1, 'month');
    this.dateChange.emit([date.month(), date.year()]);
  }
  decrementDate() {
    const date = dayjs().month(this.month).year(this.year).subtract(1, 'month');
    this.dateChange.emit([date.month(), date.year()]);
  }

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
