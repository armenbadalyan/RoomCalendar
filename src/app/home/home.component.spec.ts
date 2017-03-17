/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input, DebugElement } from '@angular/core';
import { QRCodeModule } from 'ng2-qrcode';
import { Subject }    from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageService, SettingsService, EventService, Event } from '../shared';
import { EVENTS_LIST, SINGLE_EVENT } from '../../testing';

@Component({
  selector: 'event-list', 
  template: ''
})
class EventListComponent {
  @Input()
  public events: Event[];
}

@Component({
  selector: 'room-status', 
  template: ''
})
class RoomStatusComponent { }

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let currentEventSource: Subject<any>,
      laterEventsSource: Subject<any>,
      activatedDataSource: Subject<any>;
  let PageServiceStub, SettingsServiceStub, EventServiceStub, ActivatedRouteStub;
  let eventService, eventServiceSpy;

  beforeEach(async(() => {
    laterEventsSource = new Subject();
    currentEventSource = new Subject();
    activatedDataSource = new Subject();

    PageServiceStub = {
      notifyPageInit: () => { }
    };
    SettingsServiceStub = {
      selectedCalendarUrl: 'http://google.com'
    };
    EventServiceStub = {
      laterEvents: laterEventsSource.asObservable(),
      currentEvent: currentEventSource.asObservable(),
      restartPolling: () => { }
    };
    ActivatedRouteStub = {
      data: activatedDataSource.asObservable()
    };
    TestBed.configureTestingModule({
      imports:      [ QRCodeModule ],
      declarations: [ HomeComponent, EventListComponent, RoomStatusComponent ],
      providers:    [
        { provide: PageService, useValue: PageServiceStub },
        { provide: SettingsService, useValue: SettingsServiceStub },
        { provide: EventService, useValue: EventServiceStub },
        { provide: ActivatedRoute, useValue: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    eventService = TestBed.get(EventService);
    eventServiceSpy = spyOn(eventService, 'restartPolling');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should restart event polling', () => {
    expect(eventServiceSpy).toHaveBeenCalled();
  });

  it('should get events from eventService', async(() => {
    currentEventSource.next(SINGLE_EVENT);
    laterEventsSource.next(EVENTS_LIST);

    expect(component.currentEvent).toBe(SINGLE_EVENT);
    expect(component.laterEventsList).toBe(EVENTS_LIST);
  }));
});
