/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RoomStatusComponent } from './room-status.component';
import { Event, EventService } from '../../shared';
import { DateFilterPipe, TimeFilterPipe } from '../../shared/pipes';

describe('RoomStatusComponent', () => {
  let component: RoomStatusComponent;
  let fixture: ComponentFixture<RoomStatusComponent>;
  let _currentEvent, _laterEvents, eventService;

  beforeEach(async(() => {
    _currentEvent = new BehaviorSubject(null);
    _laterEvents = new BehaviorSubject([]);

    let EventServiceStub = {
      currentEvent: _currentEvent.asObservable(),
      laterEvents: _laterEvents.asObservable()
    };

    TestBed.configureTestingModule({
      declarations: [ RoomStatusComponent, DateFilterPipe, TimeFilterPipe ],
      providers:    [
        { provide: EventService, useValue: EventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    eventService = TestBed.get(EventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have event or nextEventTime at the beginning', () => {
    expect(component.event).toEqual(null);
    expect(component.nextEventTime).toEqual(null);
  });

  it('should update event when CurrentEvent exists', async(() => {
    let curEvent = new Event().fromJSON({
      id: '0',
      title: 'test',
      creator: {
        email: 'test@test.com'
      },
      start: {
        dateTime: 'Wed Feb 22 2017 14:00:23 GMT+0500 (+05)'
      },
      end: {
        dateTime: 'Wed Feb 22 2017 15:00:23 GMT+0500 (+05)'
      }
    });
    _currentEvent.next(curEvent);
    eventService.currentEvent.subscribe((event) => {
      expect(component.event).toEqual(curEvent);
    });
  }));

  it('should update nextEventTime', async(() => {
    let startTime = new Date(),
        endTime = new Date(startTime);

    startTime.setHours(15);
    endTime.setHours(16);

    let nextEvent = new Event().fromJSON({
          id: '0',
          title: 'test',
          creator: {
            email: 'test@test.com'
          },
          start: {
            dateTime: startTime
          },
          end: {
            dateTime: endTime
          }
        });
    _laterEvents.next([nextEvent]);
    eventService.currentEvent.subscribe((event) => {
      expect(component.nextEventTime).toEqual(new Date(startTime));
    });
  }));

});
