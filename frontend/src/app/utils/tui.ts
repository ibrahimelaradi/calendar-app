import { Injectable } from '@angular/core';
import { AbstractTuiValueTransformer, TuiDay, TuiTime } from '@taiga-ui/cdk';
import dayjs from 'dayjs';

@Injectable()
export class DateTimeTransformer extends AbstractTuiValueTransformer<
  [TuiDay | null, TuiTime | null],
  string
> {
  fromControlValue(controlValue: string): [TuiDay | null, TuiTime | null] {
    const date = dayjs(controlValue);

    return date.isValid()
      ? [
          TuiDay.fromLocalNativeDate(date.toDate()),
          TuiTime.fromLocalNativeDate(date.toDate()),
        ]
      : [null, null];
  }

  toControlValue([day, time]: [TuiDay | null, TuiTime | null]): string {
    let djs = dayjs(day?.toLocalNativeDate());
    if (time) {
      djs = djs
        .hour(time.hours)
        .minute(time.minutes)
        .second(time.seconds)
        .startOf('second');
    }
    return djs.format();
  }
}
