import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseType, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { GapiServerService } from './gapi-server.service';
import { CALENDAR_LIST_DATA, EVENTS_LIST_DATA } from '../../../testing';


describe ('GapiServerService', () => {
  let gapiServerService, mockBackend;

  const eventProcess = (conn) => {
    console.log(conn.request);
    conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(EVENTS_LIST_DATA) })));
  };
  const calendarProcess = (conn) => {
    conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(CALENDAR_LIST_DATA) })));
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GapiServerService,
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

  beforeEach(async(inject([GapiServerService, MockBackend], (service, MockBackend) => {
      gapiServerService = service;
      mockBackend = MockBackend;
  })));

  beforeEach( () => {
    mockBackend.connections.subscribe((conn) => {
      if (conn.request.url.match(/.*events.*/)) {
        return eventProcess(conn);
      } else if (conn.request.url.match(/.*calendars.*/)) {
        return calendarProcess(conn);
      } else {
        conn.mockError(new Response(new ResponseOptions({ status: 404, type: ResponseType.Error })));
      }
    });
  });

  it('should construct', () => {
      expect(gapiServerService).toBeDefined();
  });

  it('should load calendars', async(() => {
      gapiServerService.loadCalendars().subscribe(res => {
        expect(res).toEqual(CALENDAR_LIST_DATA);
      });
  }));

  it('should load events', async(() => {
      gapiServerService.loadEvents('id', new Date().toISOString(), 5).subscribe(res => {
        expect(res).toEqual(EVENTS_LIST_DATA);
      });
  }));
});
