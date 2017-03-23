import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GapiService } from './gapi.service';
import { GapiServerService } from './gapi-server.service';
import { Calendar } from '../models/calendar.model';
import { environment } from '../../../environments/environment';

const calendarNameRegexp = /(?=Room).*/g;

@Injectable()
export class CalendarService {

  private _calendars: BehaviorSubject<Calendar[]> = new BehaviorSubject([]);

  public calendars: Observable<Calendar[]> = this._calendars.map(this.processCalendars);

  constructor(private gapi: GapiService, private gapiServer: GapiServerService) {}

  getCalendars(): void {
      this.gapi.loadCalendars().subscribe((jsonList) => {
        this._calendars.next(jsonList);
      });
  }

  loadCalendars(): Observable<any> {
    return (environment.use_client ? this.gapi : this.gapiServer)
           .loadCalendars();
  }

  processCalendars(calendars:any): Calendar[] {
    return calendars
              .map((calendarData) => (new Calendar()).fromJSON(calendarData))
              .filter((calendar) => !!calendar.title.match(calendarNameRegexp));
  }

}
