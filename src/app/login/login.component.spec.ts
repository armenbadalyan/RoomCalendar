/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Rx';
import { LoginComponent } from './login.component';
import { UserService, PageService } from '../shared';

let UserServiceStub,
    PageServiceStub,
    RouterStub,
    userService;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    UserServiceStub = {
      login: function(username, password) {
        return Observable.create((observer) => {
          observer.next(true);
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
