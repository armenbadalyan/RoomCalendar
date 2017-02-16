import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { environment } from '../../../environments/environment';
import { Calendar, Settings } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';


const localStorageKey = 'room_calendar_selected_calendar';

@Injectable()
export class SettingsService {

  private _maxEvents = 10;
  private _selectedCalendar: Calendar = null;
  private _calendarList: Calendar[] = [];

	constructor(private calendarService:CalendarService) {
    this.extractCurrentCalendar();
    this.calendarService.calendars
    .subscribe(
      calendars => {
          this._calendarList = calendars;
      },
      error => {
      });
  }

  get settings() {
    return new Settings({
      maxEvents: this._maxEvents,
      selectedCalendarId: this.selectedCalendarId
    });
  }

  set settings(settingsObj: Settings) {
    this._maxEvents = settingsObj.maxEvents;
    this._selectedCalendar = this.getCalendarById(settingsObj.selectedCalendarId);
    this.storeCurrentCalendar();
  }

  get maxEvents() {
    return this._maxEvents;
  }

  get selectedCalendar() {
    return this._selectedCalendar;
  }

  get selectedCalendarId(): string {
    return this._selectedCalendar ? this._selectedCalendar.id : "";
  }

  private getCalendarById(id: string): Calendar {
    for(let i=0, l=this._calendarList.length; i<l; i++) {
      let calendar = this._calendarList[i];
      if(calendar.id == id) {
        return calendar;
      }
    }
    return null;
  }

  get selectedCalendarUrl(): string {
    let url = this.selectedCalendar ? environment.google_base_calendar_url + this.selectedCalendar.id : "";
    return encodeURI(url);
  }

  private extractCurrentCalendar(): void {
    if(typeof localStorage != 'undefined') {
        try {
            let calendarJSON = localStorage.getItem(localStorageKey);
            if(calendarJSON) {
              this._selectedCalendar = new Calendar();
              this._selectedCalendar.fromJSON(JSON.parse(calendarJSON));
            }
        } catch(ex) {}
    }
  }

  public storeCurrentCalendar(): void {
    if(typeof localStorage != 'undefined' && !!this.selectedCalendar) { 
          try {
              localStorage.setItem(localStorageKey, this._selectedCalendar.toString());
          } catch(ex) { }
    }
  }

  public isReady(): boolean {
    return !!this._calendarList.length;
  }

  public isEventLoadAllowed(): boolean {
    return !!this.selectedCalendar;
  }

  public update(): void {
      this.calendarService.getCalendars();
  }

  public getCalendars(): Observable<Calendar[]> {
    return this.calendarService.calendars;

  }

}
