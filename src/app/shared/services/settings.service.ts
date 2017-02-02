import { Injectable } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Calendar } from '../models/calendar.model';

@Injectable()
export class SettingsService {

  public maxEvents = 10;
  public selectedCalendar: Calendar = null;

  private _calendarList: Calendar[] = [];

  get calendarList(): Calendar[] {
    return this._calendarList;
  }

	constructor(private calendarService:CalendarService) {
    this.calendarService.calendars
    .subscribe(
      calendars => {
        this._calendarList = calendars;
      },
      error => {
      });
  }

  update(): void {
      this.calendarService.getCalendars();
  }

}
