import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GapiService } from './gapi.service';
import { SettingsService } from './settings.service';
import { Event } from '../models/event.model';

const REPEAT_INTERVAL = 5000;

@Injectable()
export class EventService {

  private _currentEvent: BehaviorSubject<Event> = new BehaviorSubject(null);

  private _laterEvents: BehaviorSubject<Event[]> = new BehaviorSubject([]);

  private pollingStream: Observable<Event[]> = null;

  private _pollingRefresh: BehaviorSubject<any> = new BehaviorSubject(false);

  private pollingRefresh: Observable<any> = this._pollingRefresh.asObservable();

  public currentEvent: Observable<Event> = this._currentEvent.asObservable();

  public laterEvents: Observable<Event[]> = this._laterEvents.asObservable();

  constructor(private gapi: GapiService, private settings: SettingsService) {
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
          .map(this.processEvents)
          .repeatWhen(stream => stream.delay(REPEAT_INTERVAL).merge(this.pollingRefresh));

      this.pollingStream
        .distinctUntilChanged(this.checkDistinct)
        .subscribe(this.handleEvents.bind(this));
    }
  }

  checkDistinct(xArr: Event[], yArr: Event[]): boolean {
    if(xArr.length !== yArr.length) {
      return false;
    }
    return xArr.reduce((isChanged, xCurr, i) => {
      return isChanged && xCurr.equals(yArr[i])
    }, true);
  }

  refresh(): void {
    this._pollingRefresh.next(true);
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

    console.log('new events');
    this._currentEvent.next(splitEvents.currentEvent);
    this._laterEvents.next(splitEvents.laterEvents);
  }

}
