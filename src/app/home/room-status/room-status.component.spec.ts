/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RoomStatusComponent } from './room-status.component';
import { Event, DateFilterPipe, TimeFilterPipe } from 'app/shared';
import { SINGLE_EVENT, EVENTS_LIST } from 'testing';

@Component({
  template: '<room-status [event]="currentEvent" [laterEvents]="laterEventsList"></room-status>' 
})
class TestHostComponent {
  laterEventsList: Event[] = [];
  currentEvent: Event = null;
}

describe('RoomStatusComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let _currentEvent, _laterEvents;

  beforeEach(async(() => {
    _currentEvent = new BehaviorSubject(null);
    _laterEvents = new BehaviorSubject([]);

    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, RoomStatusComponent, DateFilterPipe, TimeFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('should show busy status current event exists', async(() => {
    component.currentEvent = SINGLE_EVENT;
    fixture.detectChanges();
    let busySection = fixture.debugElement.query(By.css('.room-status__busy'));
    let availableSection = fixture.debugElement.query(By.css('.room-status__available'));
    let busyTitle = fixture.debugElement.query(By.css('.room-status__busy-title'));
    expect(busySection).toBeTruthy();
    expect(availableSection).toBeFalsy();
    expect(busyTitle.nativeElement.textContent).toEqual(SINGLE_EVENT.title);
  }));

 it('should show available status when no current event exists', async(() => {
    component.currentEvent = null;
    fixture.detectChanges();
    let busySection = fixture.debugElement.query(By.css('.room-status__busy'));
    let availableSection = fixture.debugElement.query(By.css('.room-status__available'));
    expect(busySection).toBeFalsy();
    expect(availableSection).toBeTruthy();
  }));

  it('should show until what time the room is available when next event is today', async(() => {
    let time = new Date();
    let nextEvent = new Event();

    time.setHours(15);
    time.setMinutes(0);

    nextEvent.fromJSON({
      id: '0',
      start: {
        dateTime: time
      },
      end: {
        dateTime: time
      }
    });

    component.currentEvent = null;
    component.laterEventsList = [nextEvent];
    fixture.detectChanges();

    let untilText = fixture.debugElement.query(By.css('.room-status__available-next'));
    expect(untilText).toBeTruthy();
    expect(untilText.nativeElement.textContent).toBe('today until 3PM' );
  }));

  it('should tell that room is available all day if next event is not today', async(() => {
    let time = new Date();
    let nextEvent = new Event();

    time.setDate(time.getDate() + 1);

    nextEvent.fromJSON({
      id: '0',
      start: {
        dateTime: time
      },
      end: {
        dateTime: time
      }
    });

    component.currentEvent = null;
    component.laterEventsList = [nextEvent];
    fixture.detectChanges();

    let untilText = fixture.debugElement.query(By.css('.room-status__available-next'));
    expect(untilText).toBeTruthy();
    expect(untilText.nativeElement.textContent).toBe('all day long' );
  }));

});
