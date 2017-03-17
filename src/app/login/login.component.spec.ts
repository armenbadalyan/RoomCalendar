/* tslint:disable:no-unused-variable */
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Rx';
import { LoginComponent } from './login.component';
import { UserService, PageService } from '../shared';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let UserServiceStub,
      PageServiceStub,
      RouterStub;

  let userService,
      router;

  let userServiceSpy,
      routerSpy;

  beforeEach(async(() => {
    UserServiceStub = {
      login: function(username, password) {
        return Observable.create((observer) => {
          if (username === 'test' && password === 'test') {
            observer.next(true);
          } else {
            observer.error();
          }
          observer.complete();
        });
      }
    };

    PageServiceStub = {
      notifyPageInit: (page) => true
    };

    RouterStub = {
      navigate: urlArray => urlArray.length ? urlArray[0] : null
    };

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ LoginComponent ],
      providers:    [
        { provide: UserService, useValue: UserServiceStub },
        { provide: PageService, useValue: PageServiceStub },
        { provide: Router,      useValue: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    userService = TestBed.get(UserService);
    userServiceSpy = spyOn(userService, 'login').and.callThrough();

    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login with wrong credentials', fakeAsync(() => {
    component.username = 'test';
    component.password = 'SomePassword';
    fixture.detectChanges();

    let form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit', null);

    expect(userServiceSpy).toHaveBeenCalled();

    tick();

    expect(routerSpy).toHaveBeenCalledTimes(0);
    expect(component.hasError).toBeTruthy();
  }));

  it('should login with right credentials', fakeAsync(() => {
    component.username = 'test';
    component.password = 'test';
    fixture.detectChanges();

    let form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit', null);

    expect(userServiceSpy).toHaveBeenCalled();

    tick();

    expect(routerSpy).toHaveBeenCalledWith(['/settings']);
    expect(component.hasError).toBeFalsy();
  }));

});
