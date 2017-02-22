/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { SettingsComponent } from './settings.component';
import { UserService, PageService, SettingsService, Calendar, Settings } from '../shared';
import { Router } from '@angular/router';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { CALENDAR_LIST, CALENDAR_EXISTING_ID, DEFAULT_MAX_EVENTS, NEW_MAX_EVENTS } from '../../testing';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let UserServiceStub,
      PageServiceStub,
      SettingsServiceStub,
      RouterStub;
  let settingsService,
      userService,
      router;
  let userServiceSpy,
      routerSpy;

  beforeEach(async(() => {
    UserServiceStub = {
      logout: (sessionId) => Observable.create((observer) => {
        observer.next(true);
        observer.complete();
      })
    };

    PageServiceStub = {
      notifyPageInit: (page) => true
    };

    SettingsServiceStub = {
      getCalendars: () => Observable.create((observer) => {
        observer.next(CALENDAR_LIST);
        observer.complete();
      }),
      update: () => { },
      settings: new Settings({
        maxEvents: DEFAULT_MAX_EVENTS,
        selectedCalendarId: CALENDAR_EXISTING_ID
      })
    };

    RouterStub = {
      navigate(urlArray: string[]) {
        return urlArray.length ? urlArray[0] : null;
      }
    };

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SettingsComponent ],
      providers:    [
        { provide: UserService, useValue: UserServiceStub },
        { provide: PageService, useValue: PageServiceStub },
        { provide: SettingsService, useValue: SettingsServiceStub },
        { provide: Router, useValue: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.get(SettingsService);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save settings', () => {
    component.settings.maxEvents = NEW_MAX_EVENTS;
    component.save();
    expect(settingsService.settings.maxEvents).toEqual(NEW_MAX_EVENTS);
  });

  it('should save on button click', async(() => {
    const buttons    = fixture.debugElement.queryAll(By.css('button'));
    this.saveBtn     = buttons[1];
    component.settings.maxEvents = NEW_MAX_EVENTS;
    this.saveBtn.triggerEventHandler('click', null);
    expect(settingsService.settings.maxEvents).toEqual(NEW_MAX_EVENTS);
  }));

  it('should save and logout on button click', fakeAsync(() => {
    const buttons    = fixture.debugElement.queryAll(By.css('button'));
    this.logoutBtn     = buttons[2];
    userServiceSpy = spyOn(userService, 'logout').and.callThrough();
    routerSpy = spyOn(router, 'navigate');
    component.settings.maxEvents = NEW_MAX_EVENTS;
    this.logoutBtn.triggerEventHandler('click', null);
    expect(settingsService.settings.maxEvents).toEqual(NEW_MAX_EVENTS);
    expect(userServiceSpy.calls.count()).toBe(1);
    tick();
    expect(routerSpy.calls.count()).toBe(1);
    expect(routerSpy.calls.first().args[0]).toBe(['/']);
  }));

  it('should not save when going to events', fakeAsync(() => {
    const buttons    = fixture.debugElement.queryAll(By.css('button'));
    this.eventsBtn     = buttons[2];
    userServiceSpy = spyOn(userService, 'logout').and.callThrough();
    routerSpy = spyOn(router, 'navigate');
    component.settings.maxEvents = NEW_MAX_EVENTS;
    this.eventsBtn.triggerEventHandler('click', null);
    expect(userServiceSpy.calls.count()).toBe(0);
    tick();
    expect(routerSpy.calls.count()).toBe(1);
    expect(routerSpy.calls.first().args[0]).toBe(['/']);
    expect(settingsService.settings.maxEvents).toEqual(DEFAULT_MAX_EVENTS);
  }));

});
