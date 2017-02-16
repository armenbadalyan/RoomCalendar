import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Calendar } from '../models/calendar.model';
import { environment } from '../../../environments/environment';

const localStorageKey = 'room_calendar_selected_calendar';

@Injectable()
export class SettingsService {

  public maxEvents = 10;
  public selectedCalendar: Calendar = null;

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

  get calendarList(): Calendar[] {
    return this._calendarList;
  }

  get selectedCalendarId(): string {
    return this.selectedCalendar ? this.selectedCalendar.id : "";
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
              this.selectedCalendar = new Calendar();
              this.selectedCalendar.fromJSON(JSON.parse(calendarJSON));
            }
        } catch(ex) {}
    }
  }

  public storeCurrentCalendar(): void {
    if(typeof localStorage != 'undefined' && !!this.selectedCalendar) {
          try {
              localStorage.setItem(localStorageKey, this.selectedCalendar.toString());
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

}
