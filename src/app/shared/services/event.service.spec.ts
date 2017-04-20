import { async } from '@angular/core/testing';
import { EventService } from './event.service';
import { Observable } from 'rxjs/Rx';
import { EVENTS_LIST_DATA, EVENTS_LIST, CURRENT_EVENT_DATA, CURRENT_EVENT } from '../../../testing';

describe ('EventService', () => {
  let eventService;
  let SettingsStub, GapiServiceStub;

  beforeEach(() => {
    SettingsStub = {
      maxEvents: 10,
      selectedCalendarId: '1'
    };
    GapiServiceStub = {
      loadEvents: () => Observable.create((observer) => {
        observer.next([CURRENT_EVENT_DATA, ...EVENTS_LIST_DATA]);
        observer.complete();
      })
    };
    eventService = new EventService(GapiServiceStub, SettingsStub, GapiServiceStub);
  });

  it('should construct', () => {
      expect(eventService).toBeDefined();
  });

  it('should produce later events', async(() => {
    eventService.laterEvents.subscribe((eventList) => {
      expect(eventList).toEqual(EVENTS_LIST);
    });
  }));

  it('should produce current events', async(() => {
    eventService.currentEvent.subscribe((event) => {
      expect(event).toEqual(CURRENT_EVENT);
    });
  }));
});
