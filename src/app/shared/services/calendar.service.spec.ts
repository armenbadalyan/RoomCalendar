import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { CalendarService } from './calendar.service';
import { Calendar } from '../models/calendar.model';

const CALENDAR_LIST = [
  {
    id: "0",
    summary: 'Room-test-1',
    location: 'Somewhere',
    description: 'A calendar room'
  },
  {
    id: "1",
    title: 'Room-test-2',
    location: 'Somewhere',
    description: 'A calendar room 2'
  },
  {
    id: "2",
    summary: 'Room-test-3',
    location: 'Somewhere',
    description: 'A calendar room 3'
  }
];

class FakeGapiService {
  constructor() {}

  loadCalendars() {
    return Observable.create((observer) => {
      observer.next(CALENDAR_LIST);
      observer.complete();
    });
  }
};


describe ('CalendarService', () => {
  let calendarService;

  beforeEach(() => {
    calendarService = new CalendarService(new FakeGapiService());
  });


  it('should construct', () => {
      expect(calendarService).toBeDefined();
  });

  it('should get calendars', async(() => {
      calendarService.getCalendars();
      calendarService.calendars.subscribe(list => {
        expect(list).toEqual([
          new Calendar().fromJSON(CALENDAR_LIST[0]),
          new Calendar().fromJSON(CALENDAR_LIST[1]),
          new Calendar().fromJSON(CALENDAR_LIST[2])
        ]);
      }, error => {

      });
  }));
});
