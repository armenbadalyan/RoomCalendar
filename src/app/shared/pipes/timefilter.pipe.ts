import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({name: 'timeFilter'})
export class TimeFilterPipe implements PipeTransform {
  transform(value: Date, toShowMarker = true): string {
    let format = (!!value.getMinutes() ? 'h:mm' : 'h') + (toShowMarker ? 'a' : '');
    return new DatePipe('en-US').transform(value, format);
  }
}
