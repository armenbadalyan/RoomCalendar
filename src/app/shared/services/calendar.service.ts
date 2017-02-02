import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GapiService } from './gapi.service';
import { Calendar } from '../models/calendar.model';

const calendarNameRegexp = /(?=Room).*/g;

@Injectable()
export class CalendarService {

  private _calendars: BehaviorSubject<Calendar[]> = new BehaviorSubject([]);

  public calendars: Observable<Calendar[]> = this._calendars.asObservable().map(this.processCalendars);

	constructor(private gapi:GapiService) {}

  getCalendars(): void {
      this.gapi.loadCalendars().then((jsonList) => {
        this._calendars.next(jsonList);
      });
  }

  processCalendars(calendars:any): Calendar[] {
    return calendars
              .map((calendarData) => (new Calendar()).fromJSON(calendarData))
              .filter((calendar) => !!calendar.title.match(calendarNameRegexp));
  }

}
