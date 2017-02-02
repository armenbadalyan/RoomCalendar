import { Injectable } from '@angular/core';
import { CalendarService, Calendar } from './calendar.service';

@Injectable()
export class SettingsService {

  public maxEvents = 10;
  public selectedCalendar: Calendar = null;

  public calendarList: Calendar[] = [];

	constructor(private calendarService:CalendarService) {
    this.calendarService.calendars
    .subscribe(
      calendars => {
        this.calendarList = calendars;
      },
      error => {
      });
  }

  update(): void {
      this.calendarService.getCalendars();
  }

}
