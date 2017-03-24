import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

const PARAMS = {
  calendar_load_url: environment.gapi_server_url + environment.gapi_server_calendars_url,
  event_load_url: environment.gapi_server_url + environment.gapi_server_events_url,
  event_insert_url: environment.gapi_server_url + environment.gapi_server_insert_url
};

@Injectable()
export class GapiServerService {

  constructor(private http: Http) { }

  loadCalendars(): Observable<any> {
    return this.http.get(PARAMS.calendar_load_url, {
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                })
             })
             .map(response => response.json());
  }

  loadEvents(calendarId: string, timeMin: string, limit: number, orderby = 'startTime'): Observable<any> {
    let params = new URLSearchParams();
    params.append('calendarId', calendarId);
    params.append('time', timeMin);
    params.append('limit', limit.toString());

    return this.http.get(PARAMS.event_load_url, {
              search: params,
              headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              })
            })
            .map(response => response.json());
  }

  insertEvent(calendarId: string, eventTitle: string, email: string, startTime: string, endTime: string): Observable<any> {let params = new URLSearchParams();
    
    params.append('calendarId', calendarId);
    params.append('creator', email);
    params.append('title', eventTitle);
    params.append('startTime', startTime);
    params.append('endTime', endTime);

    console.log('inserting');
    console.log(PARAMS.event_insert_url);

    return this.http.get(PARAMS.event_insert_url, {
              search: params,
              headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              })
            })
            .map(response => response.json());
  }
}
