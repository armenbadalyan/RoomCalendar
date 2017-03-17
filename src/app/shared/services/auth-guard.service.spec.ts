import { async, TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';


describe ('AuthGuardService', () => {
  let authGuard;
  let isLogged;
  let UserServiceStub, RouterStub;
  let router, routerSpy, userService;

  beforeEach(() => {
    UserServiceStub = {
      isLoggedIn: () => {
        return isLogged;
      }
    };

    RouterStub = {
      navigate(urlArray: string[]) {
        return urlArray.length ? urlArray[0] : null;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: UserServiceStub }, 
        { provide: Router, useValue: RouterStub }
      ]
    });
  });

  beforeEach(async(inject([AuthGuard, Router, UserService], (service, Router, userServiceInstance) => {
      authGuard = service;
      router = Router;
      routerSpy = spyOn(router, 'navigate');
      userService = userServiceInstance;
  })));

  it('should construct', () => {
      expect(authGuard).toBeDefined();
  });

  it('should redirect if user is not logged in', () => {
      isLogged = false;
      authGuard.canActivate({}, {url: ''});
      expect(routerSpy.calls.count()).toBe(1);
  });

  it('should not redirect if user is logged in', () => {
      isLogged = true;
      authGuard.canActivate({}, {url: ''});
      expect(routerSpy.calls.count()).toBe(0);
  });
});
