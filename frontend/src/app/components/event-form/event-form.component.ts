import { AsyncPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CreateEventParams,
  EventDto,
  UpdateEventParams,
} from '@calendar-app/schemas/dtos/events.dto';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiCheckboxModule,
  TuiFieldErrorPipeModule,
  TuiInputDateTimeModule,
  TuiInputModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';
import dayjs from 'dayjs';
import { omit } from '../../utils/object';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiInputDateTimeModule,
    TuiCheckboxLabeledModule,
    TuiButtonModule,
    TuiErrorModule,
    AsyncPipe,
    TuiFieldErrorPipeModule,
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css',
})
export class EventFormComponent implements OnChanges {
  @Input() event?: EventDto;
  @Input() date?: dayjs.Dayjs;
  @Output() submitEventParams = new EventEmitter<
    CreateEventParams | UpdateEventParams
  >();

  get submitButtonLabel() {
    return this.event ? 'Update' : 'Create';
  }
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl<string>(''),
    startDate: new FormControl(dayjs().format('YYYY-MM-DD'), [
      Validators.required,
    ]),
    endDate: new FormControl(''),
    allDay: new FormControl(true),
    isReoccurring: new FormControl(false),
    isPublic: new FormControl(false),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['date'] &&
      changes['date'].currentValue &&
      changes['date'].currentValue !== changes['date'].previousValue
    ) {
      this.form.patchValue({
        startDate: changes['date'].currentValue.format('YYYY-MM-DD'),
        endDate: null,
      });
    }
    if (
      changes['event'] &&
      changes['event'].currentValue &&
      changes['event'].currentValue !== changes['event'].previousValue
    ) {
      const start = dayjs(changes['event'].currentValue.startDate);
      const end = dayjs(changes['event'].currentValue.endDate);
      const allDay =
        start.format() === start.startOf('day').format() &&
        end.format() === start.endOf('day').format();
      const values = omit(changes['event'].currentValue as EventDto, [
        'id',
        'userId',
        'createdAt',
        'updatedAt',
      ]) as any; // FIXME Don't use any, try to stop typescript from complaining instead :')
      this.form.setValue({ ...values, allDay });
    } else if (changes['event'] && !changes['event'].currentValue) {
      this.form.reset({
        title: '',
        description: '',
        startDate: dayjs().format('YYYY-MM-DD'),
        endDate: '',
        allDay: true,
        isReoccurring: false,
        isPublic: false,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { allDay, ...values } = this.form.value;
    if (allDay) {
      values.endDate = dayjs(values.startDate).endOf('day').format();
    }

    this.submitEventParams.emit(
      values as CreateEventParams | UpdateEventParams
    );
  }
}
