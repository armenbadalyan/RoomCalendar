import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseType, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let userService, mockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  beforeEach(async(inject([UserService, MockBackend], (service, MockBackend) => {
      userService = service;
      mockBackend = MockBackend;
  })));

  it('should construct', () => {
      expect(userService).toBeDefined();
  });

  it('state should not be logged in', () => {
      expect(userService.isLoggedIn()).toEqual(false);
  });

  describe('Authentication', () => {
    const mockResponse = {
            user: {
              _id: '123',
              username: 'Test'
            },
            token: '1qaz@WSX'
          };
    const isValidUser = (requestData) => {
      if (!requestData.username || !requestData.password) {
        return false;
      }
      return requestData.username === 'test' && requestData.password === 'test';
    };
    const loginProcess = (conn) => {
      let data: any = JSON.parse(conn.request.getBody());
      let isSuccess = isValidUser(data);
      let responseJSON = isSuccess
          ?  conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })))
          :  conn.mockError(new Response(new ResponseOptions({ status: 400, type: ResponseType.Error })));
    };
    const logoutProcess = (conn) => {
      let data: any = JSON.parse(conn.request.getBody());
      let isSuccess =  data.sessionToken && data.sessionToken === '1qaz@WSX';
      let responseJSON = isSuccess
          ?  conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify({ success: true }) })))
          :  conn.mockError(new Response(new ResponseOptions({ status: 400, type: ResponseType.Error })));
    };
    const authenticationProcess = (conn) => {
      if (conn.request.url.match(/.*login.*/)) {
        return loginProcess(conn);
      } else if (conn.request.url.match(/.*logout.*/)) {
        return logoutProcess(conn);
      } else {
        conn.mockError(new Response(new ResponseOptions({ status: 404, type: ResponseType.Error })));
      }
    };

    beforeEach( () => {
      mockBackend.connections.subscribe(authenticationProcess);
    });

    it('should return User and state should be logged in', async(() => {

      const result = userService.login('test', 'test');

      result.subscribe(res => {
        expect(res).toEqual(jasmine.any(User));
        expect(userService.isLoggedIn()).toEqual(true);
      }, err => {
        expect(userService.isLoggedIn()).toEqual(false);
      });

    }));

    it('state should be logged out', async(() => {

      userService.login().subscribe(res => {

      }, err => {
        expect(userService.isLoggedIn()).toEqual(false);
      });
    }));

    it('should log in and log out', async(() => {

      userService.login('test', 'test').subscribe(res => {
        expect(res).toEqual(jasmine.any(User));
        expect(userService.isLoggedIn()).toEqual(true);

        userService.logout(res.sessionToken).subscribe(res => {
          expect(userService.isLoggedIn()).toEqual(false);
        }, err => {

        });
      }, err => {
        expect(userService.isLoggedIn()).toEqual(false);
      });
    }));

  });
});
