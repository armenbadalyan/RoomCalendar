/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PageService, Page } from '../../../shared';
import { Subject }    from 'rxjs/Subject';

import { HeaderComponent } from './header.component';

@Component({
  selector: 'clock',
  template: ''
})
class ClockComponent { }

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let pageInitializedSource: Subject<any>;
  let pageService;
  let PageServiceStub;
  let RouterStub;

  beforeEach(async(() => {
    pageInitializedSource = new Subject();

    PageServiceStub = {
      pageInitialized: pageInitializedSource.asObservable()
    };

    RouterStub = {
      navigate: (urlArray) => urlArray.length ? urlArray[0] : null
    };

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ClockComponent ],
      providers:    [
        { provide: PageService, useValue: PageServiceStub },
        { provide: Router,      useValue: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set positive properties from PageService', fakeAsync(() => {
    pageInitializedSource.next({
      title: 'Test header',
      hasMenu: true,
      isTitleCentered: true
    });

    tick();
    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('.app-header__title'));
    let menu = fixture.debugElement.query(By.css('.app-header__button--menu'));
    let titleEl = title.nativeElement;
    expect(titleEl.textContent).toEqual('Test header');
    expect(titleEl.className.indexOf('app-header__title--centered')).toBeGreaterThanOrEqual(0);
    expect(menu).toBeTruthy();
  }));

  it('should set negative properties from PageService', fakeAsync(() => {
    pageInitializedSource.next({
      title: 'Test header',
      hasMenu: false,
      isTitleCentered: false
    });

    tick();
    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('.app-header__title'));
    let menu = fixture.debugElement.query(By.css('.app-header__button--menu'));
    let titleEl = title.nativeElement;
    expect(titleEl.textContent).toEqual('Test header');
    expect(titleEl.className.indexOf('app-header__title--centered')).toBe(-1);
    expect(menu).toBeFalsy();
  }));
});
