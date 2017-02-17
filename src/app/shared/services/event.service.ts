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

  private pollingStream: Observable<Event[]> = null;

  public currentEvent: Observable<Event> = this._currentEvent.asObservable();

  public laterEvents: Observable<Event[]> = this._laterEvents.asObservable();

  constructor(private gapi: GapiService, private settings: SettingsService) {
    this._events
      .map(this.processEvents)
      .subscribe(this.handleEvents.bind(this));

    this.startPolling();
  }

  startPolling(): void {
    if (!this.pollingStream) {
      this.pollingStream =
        Observable.of(0)
          .map(() => this.settings.selectedCalendarId)
          .filter(id => !!id)
          .switchMap(id => this.gapi.loadEvents(id, (new Date()).toISOString(), this.settings.maxEvents))
          .catch(err => Observable.of(null))
          .filter(result => !!result)
          .repeatWhen(stream => stream.delay(5000));

      this.pollingStream.subscribe(jsonList => {
        this._events.next(jsonList);
      });
    }
  }

  processEvents(events: any): Event[] {
    return events
      .map((eventData) => (new Event()).fromJSON(eventData));
  }

  handleEvents(events: Event[]): void {
    let currentTime: Date = new Date();

    let splitEvents = events.reduce((output, event: Event) => {
    let startTime: Date = event.startDate,
        endTime: Date = event.endDate;
      if (output.currentEvent || startTime > currentTime || endTime < currentTime) {
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
