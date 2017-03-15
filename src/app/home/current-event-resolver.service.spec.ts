import { async, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CurrentEventResolver } from './current-event-resolver.service';
import { SettingsService } from 'app/shared';
import { SINGLE_CALENDAR } from 'testing';


describe('CurrentEventResolverService', () => {
  let currentEventResolverService : CurrentEventResolver;
  let isAllowed : boolean;
  let RouterStub;
  let SettingsServiceStub;
  let routerSpy;

  beforeEach(() => {
    SettingsServiceStub = {
      isEventLoadAllowed: () => isAllowed,
      selectedCalendar: SINGLE_CALENDAR
    };

    RouterStub = {
      navigate(urlArray: string[]) {
        return urlArray.length ? urlArray[0] : null;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        CurrentEventResolver,
        { provide: Router, useValue: RouterStub },
        { provide: SettingsService, useValue: SettingsServiceStub }
      ]
    });
  });

  beforeEach(inject([CurrentEventResolver, Router], (service, router) => {
      currentEventResolverService = service;
      routerSpy = spyOn(router, 'navigate');
  }));

  it('should construct', () => {
      expect(currentEventResolverService).toBeDefined();
  });

  it('should redirect to no room component when load is not allowed', () => {
      isAllowed = false;
      expect(currentEventResolverService.resolve(null, null)).toEqual(null);
      expect(routerSpy).toHaveBeenCalledWith(['/no-room']);
  });

  it('should not redirect to no room component when load is allowed', () => {
      isAllowed = true;
      expect(currentEventResolverService.resolve(null, null)).toEqual(SINGLE_CALENDAR);
      expect(routerSpy.calls.count()).toBe(0); 
  });

});
