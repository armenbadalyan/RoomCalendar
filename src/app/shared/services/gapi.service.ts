import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

const params = {
  'clientId': environment.gapi_client_id,
  'scope': environment.gapi_scope,
};

@Injectable()
export class GapiService {
  constructor() { }

  private loadScript(url: string): void {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  private loadClient(): Observable<any> {
    return Observable.create((observer) => {
      window['gapi'].load('client', () => {
        observer.next(true);
        observer.complete();
      });
    });
  }

  private initClient(): Observable<any> {
    return Observable.fromPromise(window['gapi'].client.init(params));
  }

  private loadCalendarApi(): Observable<any> {
    return Observable.fromPromise(window['gapi'].client.load('calendar', 'v3'));
  }

  private loadCalendaList(): Observable<any> {
    return Observable.fromPromise(window['gapi'].client.calendar.calendarList.list());
  }

  private loadEventList(params: {}): Observable<any> {
    return Observable.fromPromise(window['gapi'].client.calendar.events.list(params));
  }

  getApi(): Observable<any> {
    var observer = Observable.create((observer) => {
      window['_gapiOnLoad'] = (ev) => {
        observer.next(true);
        observer.complete();
      }

      this.loadScript(environment.gapi_url);
    });

    this.getApi = () => observer
      .flatMap(() => this.loadClient())
      .flatMap(() => this.initClient());

    return this.getApi();
  }

  login(): Observable<any> {
    let GoogleAuth = window['gapi'].auth2.getAuthInstance();

    return GoogleAuth.isSignedIn.get()
      ? Observable.create((observer) => { observer.next(true); observer.complete(); })
      : Observable.fromPromise(GoogleAuth.signIn());
  }

  loadCalendars(): Observable<any> {
    return this.getApi()
      .flatMap(() => this.login())
      .flatMap(() => this.loadCalendarApi())
      .flatMap(() => this.loadCalendaList())
      .map((resp: any) => resp.result.items)
  }

  loadEvents(calendarId: string, timeMin: string, limit: number, orderby = 'startTime'): Observable<any> {
    let params = {
      'calendarId': calendarId,
      'timeMin': timeMin,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': limit,
      'orderBy': orderby
    };

    return this.getApi()
      .flatMap(() => this.login())
      .flatMap(() => this.loadCalendarApi())
      .flatMap(() => this.loadEventList(params))
      .map((resp: any) => resp.result.items)
  }
}
