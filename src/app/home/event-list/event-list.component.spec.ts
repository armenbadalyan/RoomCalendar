/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { EventListComponent } from './event-list.component';
import { ScrollDelegateService, Event } from '../../shared';
import { EVENTS_LIST } from '../../../testing';

@Component({
  selector: 'scroll-fader', 
  template: '<ng-content></ng-content>'
})
class ScrollFaderComponent { }

@Component({
  template: '<event-list [events]="laterEventsList"></event-list>' 
})
class TestHostComponent {
  laterEventsList: Event[] = [];
}

/* USAGE OF REAL PIPE CAUSE PHANTONJS TO FALL WITH 'unmatched parentheses' ERROR */
@Pipe({name: 'dateFilter'})
export class DateFilterPipe implements PipeTransform {
  transform(value: Date, format = 'EEE, MMM dd') {
    return value;
  }
}

@Pipe({name: 'timeFilter'})
export class TimeFilterPipe implements PipeTransform {
  transform(value: Date, format = 'EEE, MMM dd') {
    return value;
  }
}

describe('EventListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let scrollDelegateService: ScrollDelegateService;
  let scrollDelegateServiceStub;
  let scrollDelegateSpy;

  beforeEach(async(() => {
    scrollDelegateServiceStub = {
      refresh: () => { }
    };
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, EventListComponent, ScrollFaderComponent, DateFilterPipe, TimeFilterPipe ],
      providers:    [
        { provide: ScrollDelegateService, useValue: scrollDelegateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    scrollDelegateService = TestBed.get(ScrollDelegateService);
    scrollDelegateSpy = spyOn(scrollDelegateService, 'refresh');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ScrollDelegateService when input data changes', fakeAsync(() => {
    expect(scrollDelegateSpy.calls.count()).toBe(0);
    component.laterEventsList = EVENTS_LIST;
    fixture.detectChanges();
    tick();
    expect(scrollDelegateSpy).toHaveBeenCalled();
  }));

});
