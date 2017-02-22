import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { CalendarService } from './calendar.service';
import { Calendar } from '../models/calendar.model';
import {CALENDAR_LIST_DATA, CALENDAR_LIST } from '../../../testing';


describe ('CalendarService', () => {
  let calendarService, GapiServiceStub;

  beforeEach(() => {
    GapiServiceStub = {
      loadCalendars: () => Observable.create((observer) => {
        observer.next(CALENDAR_LIST_DATA);
        observer.complete();
      })
    };
    calendarService = new CalendarService(GapiServiceStub);

  });

  it('should construct', () => {
      expect(calendarService).toBeDefined();
  });

  it('should get calendars', async(() => {
      calendarService.getCalendars();
      calendarService.calendars.subscribe(list => {
        expect(list).toEqual(CALENDAR_LIST);
      }, error => {

      });
  }));
});
