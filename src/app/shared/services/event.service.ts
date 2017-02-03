import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GapiService } from './gapi.service';
import { SettingsService } from './settings.service';
import { Event } from '../models/event.model';

@Injectable()
export class EventService {

  private _events: BehaviorSubject<Event[]> = new BehaviorSubject([]);

  public events: Observable<Event[]> = this._events.map(this.processEvents);

	constructor(private gapi:GapiService, private settings:SettingsService) {}

  getEvents(): void {
      if(this.settings.isEventLoadAllowed()) {
        this.gapi.loadEvents(this.settings.selectedCalendarId, (new Date()).toISOString(), this.settings.maxEvents).subscribe((jsonList) => {
          this._events.next(jsonList);
        });
      }
  }

  processEvents(events:any): Event[] {
    return events
              .map((eventData) => (new Event()).fromJSON(eventData));
  }

}
