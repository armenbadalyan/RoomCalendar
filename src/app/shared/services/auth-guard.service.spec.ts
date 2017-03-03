import { async } from '@angular/core/testing';
import { AuthGuard } from './auth-guard.service';


describe ('AuthGuardService', () => {
  let authGuard;
  let isLogged;
  let UserServiceStub, RouterStub;

  beforeEach(() => {

    UserServiceStub = {
      isLogged: () => isLogged
    };

    RouterStub = {
      navigate(urlArray: string[]) {
        return urlArray.length ? urlArray[0] : null;
      }
    };

    authGuard = new AuthGuard(RouterStub, UserServiceStub);
  });

  it('should construct', () => {
      expect(authGuard).toBeDefined();
  });
});
