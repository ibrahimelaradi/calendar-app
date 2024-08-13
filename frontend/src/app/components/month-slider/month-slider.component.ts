import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-month-slider',
  standalone: true,
  imports: [TuiSvgModule],
  templateUrl: './month-slider.component.html',
  styleUrl: './month-slider.component.css',
})
export class MonthSliderComponent {
  @Input() month: number = dayjs().month();
  @Input() year: number = dayjs().year();
  @Output() dateChange = new EventEmitter<[month: number, year: number]>();

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
}
