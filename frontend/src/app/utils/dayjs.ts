import dayjs from 'dayjs';

export function hasIntersection(
  a: [dayjs.Dayjs, dayjs.Dayjs],
  b: [dayjs.Dayjs, dayjs.Dayjs]
) {
  return !(a[1].isBefore(b[0]) || a[0].isAfter(b[1]));
}

export function makeDayRange(day: dayjs.Dayjs): [dayjs.Dayjs, dayjs.Dayjs] {
  return [day.startOf('day'), day.endOf('day')];
}

export function makeCustomRange(
  start: dayjs.Dayjs,
  duration: number,
  unit: dayjs.ManipulateType
): [dayjs.Dayjs, dayjs.Dayjs] {
  return [start, start.add(duration, unit)];
}
