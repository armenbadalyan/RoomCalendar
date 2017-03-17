/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show time properly formatted', () => {
    let curDate = new Date();
    expect(component.time.toDateString()).toEqual(curDate.toDateString());
    expect(component.time.getHours()).toEqual(curDate.getHours());
    expect(component.time.getMinutes()).toEqual(curDate.getMinutes());
  });

  it('should show date details in component', () => {
    let date = new Date();
    date.setDate(22);
    date.setMonth(1);
    date.setFullYear(2017);
    date.setHours(9);
    date.setMinutes(30);

    let deTime = fixture.debugElement.query(By.css('.clock__time'));
    let elTime = deTime.nativeElement;
    let deAmPm = fixture.debugElement.query(By.css('.clock__am-pm'));
    let elAmPm = deAmPm.nativeElement;
    let deDate = fixture.debugElement.query(By.css('.clock__date'));
    let elDate = deDate.nativeElement;

    component.time = date;
    fixture.detectChanges();
    expect(elTime.textContent).toEqual('09:30');
    expect(elAmPm.textContent).toEqual('AM');
    expect(elDate.textContent).toEqual('Wed, Feb 22');
  });
});
