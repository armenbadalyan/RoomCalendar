/* tslint:disable:no-unused-variable */
import { async, fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { NoRoomComponent } from './no-room.component';
import { PageService } from '../shared';

let PageServiceStub;

@Component({
  template: `<app-no-room></app-no-room><router-outlet></router-outlet>`
})
class TestHostComponent {}

@Component({
  template: ''
})
class DummyComponent { }

describe('NoRoomComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {

    PageServiceStub = {
      notifyPageInit: (page) => true
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'settings', component: DummyComponent }
        ])
      ],
      declarations: [ TestHostComponent, NoRoomComponent, DummyComponent ],
      providers:    [
        { provide: PageService, useValue: PageServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([Router, Location], (_router: Router, _location: Location) => {
    location = _location;
    router = _router;
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('link should go to settings', fakeAsync(() => {
      fixture.debugElement.query(By.css('a')).nativeElement.click();
      tick();
      expect(location.path()).toEqual('/settings');
  }));

});
