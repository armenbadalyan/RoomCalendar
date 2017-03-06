import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SettingsService } from './settings.service';
import { Calendar, Settings } from '../models';
import { CALENDAR_LIST, CALENDAR_EXISTING_ID, CALENDAR_NON_EXISTING_ID, DEFAULT_MAX_EVENTS, NEW_MAX_EVENTS } from '../../../testing';

const localStorageKey = 'room_calendar_selected_calendar';

describe ('SettingsService', () => {
  let settingsService, CalendarServiceStub;
  let _calendars: BehaviorSubject<Calendar[]>;

  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(localStorageKey);
    }

    _calendars = new BehaviorSubject([]);

    CalendarServiceStub = {
      calendars: _calendars.asObservable(),
      getCalendars: () => _calendars.next(CALENDAR_LIST)
    };

    settingsService = new SettingsService(CalendarServiceStub);
  });

  it('should construct', () => {
      expect(settingsService).toBeDefined();
  });

  it('should have default params', async(() => {
      expect(settingsService.maxEvents).toBeDefined();
      expect(settingsService.maxEvents).toEqual(jasmine.any(Number));
      expect(settingsService.selectedCalendar).toEqual(null);
      expect(settingsService.isReady()).toEqual(false);
  }));

  it('should get Calendars after update', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        expect(calendarList).toEqual(CALENDAR_LIST);
        expect(settingsService.isReady()).toEqual(true);
      });
  }));

  it('should get only set MaxEvents when no calendars exist', async(() => {
      settingsService.settings = new Settings({
        maxEvents: NEW_MAX_EVENTS,
        selectedCalendarId: CALENDAR_EXISTING_ID
      });
      expect(settingsService.maxEvents).toEqual(NEW_MAX_EVENTS);
      expect(settingsService.selectedCalendar).toEqual(null);
  }));

  it('should set both MaxEvents and SelectedCalendar when there is calendar list', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        expect(settingsService.selectedCalendarId).toEqual('');
        settingsService.settings = new Settings({
          maxEvents: NEW_MAX_EVENTS,
          selectedCalendarId: CALENDAR_EXISTING_ID
        });
        expect(settingsService.maxEvents).toEqual(NEW_MAX_EVENTS);
        expect(settingsService.selectedCalendarId).toEqual(CALENDAR_EXISTING_ID);
      });
  }));

  it('should save SelectedCalendar to localStorage', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        expect(localStorage.getItem(localStorageKey)).toEqual(null);
        settingsService.settings = new Settings({
          maxEvents: DEFAULT_MAX_EVENTS,
          selectedCalendarId: CALENDAR_EXISTING_ID
        });
        expect(new Calendar().fromJSON(JSON.parse(localStorage.getItem(localStorageKey))).id).toEqual(CALENDAR_EXISTING_ID);
      });
  }));

  it('should not set selectedCalendarId if it is not in the calendarList array', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        settingsService.settings = new Settings({
          maxEvents: NEW_MAX_EVENTS,
          selectedCalendarId: CALENDAR_NON_EXISTING_ID
        });
        expect(settingsService.maxEvents).toEqual(NEW_MAX_EVENTS);
        expect(settingsService.selectedCalendar).toEqual(null);
      });
  }));


});