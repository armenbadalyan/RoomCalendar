import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

const PARAMS = {
  'clientId': environment.gapi_client_id,
  'scope': environment.gapi_scope,
};
const TIMEOUT = 10000;

@Injectable()
export class GapiService {

  private zone: NgZone;
  private scriptLoaded: boolean = false;

  constructor() {
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  private loadScript(url: string): void {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  private loadClient(): Observable<any> {
    return Observable.create((observer) => {
      window['gapi'].load('client', () => {
        this.zone.run(() => {
          observer.next(true);
          observer.complete();
        });
      });
    });
  }

  private fromPromiseToObservableWithZone(promise: Promise<any>): Observable<any> {
    return Observable.create(observer => {
      Observable.fromPromise(promise).subscribe(result => {
        this.zone.run(() => {
          observer.next(result);
          observer.complete();
        });
      },
        err => {
          observer.error();
        });
    });
  }

  private initClient(): Observable<any> {
    return this.fromPromiseToObservableWithZone(window['gapi'].client.init(PARAMS));
  }

  private loadCalendarApi(): Observable<any> {
    return this.fromPromiseToObservableWithZone(window['gapi'].client.load('calendar', 'v3'));
  }

  private loadCalendaList(): Observable<any> {
    return this.fromPromiseToObservableWithZone(window['gapi'].client.calendar.calendarList.list());
  }

  private loadEventList(params: {}): Observable<any> {
    return this.fromPromiseToObservableWithZone(window['gapi'].client.calendar.events.list(params));
  }

  getApi(): Observable<any> {
    var observer = Observable.create((observer) => {
      window['_gapiOnLoad'] = (ev) => {
        observer.next();
        observer.complete();
        this.scriptLoaded = true;
      }
      
      if (!this.scriptLoaded) {
        try {
          this.loadScript(environment.gapi_url);
        }
        catch (err) {
          observer.error();
        }

      }
      else {
        observer.next();
        observer.complete();
      }

    });

    this.getApi = () => observer
      .flatMap(() => this.loadClient())
      .timeout(TIMEOUT)
      .flatMap(() => this.initClient());

    return this.getApi();
  }

  login(): Observable<any> {
    let GoogleAuth = window['gapi'].auth2.getAuthInstance();

    return GoogleAuth.isSignedIn.get()
      ? Observable.create((observer) => { observer.next(true); observer.complete(); })
      : this.fromPromiseToObservableWithZone(GoogleAuth.signIn());
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
