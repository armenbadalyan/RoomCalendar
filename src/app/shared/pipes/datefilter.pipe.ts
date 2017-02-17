import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

const todayValue = 'Today';
const tomorrowValue = 'Tomorrow';

@Pipe({name: 'dateFilter'})
export class DateFilterPipe implements PipeTransform {
  transform(value: Date, format = 'EEE, MMM dd'): string {
    let currentDate: Date = new Date(),
        tomorrow: Date = new Date(currentDate);

    tomorrow.setDate(currentDate.getDate() + 1);

    if(value.toDateString() === currentDate.toDateString())
        return todayValue;

    if(value.toDateString() === tomorrow.toDateString())
        return tomorrowValue;

    return new DatePipe('en-US').transform(value, format);
  }
}
