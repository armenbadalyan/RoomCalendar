import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GapiService } from './gapi.service';
import { SettingsService } from './settings.service';
import { Event } from '../models/event.model';

@Injectable()
export class EventService {

  private _events: BehaviorSubject<Event[]> = new BehaviorSubject([]);

  private _currentEvent: BehaviorSubject<Event> = new BehaviorSubject(null);

  private _laterEvents: BehaviorSubject<Event[]> = new BehaviorSubject([]);

  public currentEvent: Observable<Event> = this._currentEvent.asObservable();

  public laterEvents: Observable<Event[]> =  this._laterEvents.asObservable();

  constructor(private gapi:GapiService, private settings:SettingsService) {
       this._events
          .map(this.processEvents)
          .subscribe(this.handleEvents.bind(this));
  }

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

  handleEvents(events: Event[]): void {
      let currentTime: Date = new Date();

      let splitEvents = events.reduce((output, event: Event) => {
          let startTime: Date = event.startDate,
              endTime: Date =  event.endDate;
          if(startTime > currentTime || endTime < currentTime) {
              output.laterEvents.push(event);
          } else {
              output.currentEvent = event;
          }
          return output;
      }, {
          currentEvent: null,
          laterEvents: []
      });

      this._currentEvent.next(splitEvents.currentEvent);
      this._laterEvents.next(splitEvents.laterEvents);
  }

}
