/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { QuickBookingComponent } from './quick-booking.component';
import { FormsModule } from '@angular/forms';
import { GapiServerService } from 'app/shared';
import { BookingModel } from 'app/shared';
import { dispatchEvent } from "@angular/platform-browser/testing/browser_util";

@Component({
  template: '<quick-booking [nextEvent]="nextEventTime" [calendarId]="calendarId"></quick-booking>' 
})
class TestHostComponent {
  nextEventTime: Date = null;
  calendarId: string = "123"; 
}

@Component({
  selector: 'popup', 
  template: '<div><ng-content></ng-content></div>'
})
class PopupComponent {
  show() { }
}

describe('QuickBookingComponent', () => {
  let component: QuickBookingComponent;
  let fixture: ComponentFixture<QuickBookingComponent>;
  let GapiServerServiceStub;
  let insertResponse;
  let gapiServerService;
  let insertSpy;

  beforeEach(async(() => {
    insertResponse = new BehaviorSubject(null);

    GapiServerServiceStub = {
      insertEvent: () => { 
        insertResponse.next(true);
        return insertResponse.asObservable();
      }
    };

    TestBed.configureTestingModule({
      imports: [ FormsModule ], 
      declarations: [ TestHostComponent, QuickBookingComponent, PopupComponent ],
      providers:    [
        { provide: GapiServerService, useValue: GapiServerServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickBookingComponent);
    component = fixture.componentInstance;
    gapiServerService = TestBed.get(GapiServerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate avaiable times correctly', () => {
    let date: Date = new Date();
    let date2: Date = new Date();
    let date3: Date = new Date();
    
    date.setHours(date.getHours() + 1);
    date.setMinutes(date.getMinutes() + 1);

    date2.setHours(date2.getHours() + 2);
    date2.setMinutes(date2.getMinutes() + 1);

    component.nextEvent = date;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('option[value]')).length).toBe(3);

    component.nextEvent = date2;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('option[value]')).length).toBe(4);

    component.nextEvent = new Date();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('option[value]')).length).toBe(0);
  });

  it('should call service to insert event', () => {
    insertSpy = spyOn(gapiServerService, 'insertEvent').and.callThrough();

    let date = new Date();
    date.setHours(date.getHours() + 1);

    component.nextEvent = date;
    component.bookingModel.eventTitle = "title";
    component.bookingModel.email = "test@test.com";
    component.bookingModel.timeInterval = component.availableTimes[0].value;
    

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(insertSpy).toHaveBeenCalled();
  });

});
