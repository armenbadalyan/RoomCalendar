import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { GapiService } from './gapi.service';
import { environment } from '../../../environments/environment';


describe ('GapiService', () => {
  let gapiService;

  beforeEach(() => {
    gapiService = new GapiService();
  });

  it('should construct', () => {
    expect(gapiService).toBeDefined();
  });

  it('should have load events method', () => {
    expect(gapiService.loadEvents).toBeDefined();
  });

  it('should have load calendars method', () => {
    expect(gapiService.loadCalendars).toBeDefined();
  });

  it('should have login method', () => {
    expect(gapiService.login).toBeDefined();
  });
});
