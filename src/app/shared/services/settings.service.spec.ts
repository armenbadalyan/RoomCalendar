import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SettingsService } from './settings.service';
import { Calendar, Settings } from '../models';

const CALENDAR_LIST = [
  {
    id: '0',
    summary: 'Room-test-1',
    location: 'Somewhere',
    description: 'A calendar room'
  },
  {
    id: '1',
    title: 'Room-test-2',
    location: 'Somewhere',
    description: 'A calendar room 2'
  },
  {
    id: '2',
    summary: 'Room-test-3',
    location: 'Somewhere',
    description: 'A calendar room 3'
  }
];

const localStorageKey = 'room_calendar_selected_calendar';

class FakeCalendarService {

  private _calendars: BehaviorSubject<Calendar[]> = new BehaviorSubject([]);

  public calendars: Observable<Calendar[]> = this._calendars.asObservable();

  constructor() { }

  getCalendars() {
    this._calendars.next([
      new Calendar().fromJSON(CALENDAR_LIST[0]),
      new Calendar().fromJSON(CALENDAR_LIST[1]),
      new Calendar().fromJSON(CALENDAR_LIST[2])
    ]);
  }
}

describe ('SettingsService', () => {
  let settingsService;

  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.removeItem(localStorageKey);
        } catch (ex) {}
    }
    settingsService = new SettingsService(new FakeCalendarService());
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
        expect(calendarList).toEqual([
          new Calendar().fromJSON(CALENDAR_LIST[0]),
          new Calendar().fromJSON(CALENDAR_LIST[1]),
          new Calendar().fromJSON(CALENDAR_LIST[2])
        ]);
        expect(settingsService.isReady()).toEqual(true);
      });
  }));

  it('should get only set MaxEvents when no calendars exist', async(() => {
      settingsService.settings = new Settings({
        maxEvents: 100500,
        selectedCalendarId: '1'
      });
      expect(settingsService.maxEvents).toEqual(100500);
      expect(settingsService.selectedCalendar).toEqual(null);
  }));

  it('should set both MaxEvents and SelectedCalendar when there is calendar list', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        expect(settingsService.selectedCalendarId).toEqual('');
        settingsService.settings = new Settings({
          maxEvents: 100500,
          selectedCalendarId: '1'
        });
        expect(settingsService.maxEvents).toEqual(100500);
        expect(settingsService.selectedCalendarId).toEqual('1');
      });
  }));

  it('should save SelectedCalendar to localStorage', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        expect(localStorage.getItem(localStorageKey)).toEqual(null);
        settingsService.settings = new Settings({
          maxEvents: 10,
          selectedCalendarId: '1'
        });
        expect(new Calendar().fromJSON(JSON.parse(localStorage.getItem(localStorageKey))).id).toEqual('1');
      });
  }));

  it('should not set selectedCalendarId if it is not in the calendarList array', async(() => {
      settingsService.update();
      settingsService.getCalendars().subscribe((calendarList) => {
        settingsService.settings = new Settings({
          maxEvents: 100500,
          selectedCalendarId: '10'
        });
        expect(settingsService.maxEvents).toEqual(100500);
        expect(settingsService.selectedCalendar).toEqual(null);
      });
  }));


});