import { Injectable } from '@angular/core';

const gapiUrl = "https://apis.google.com/js/api.js?onload=_gapiOnLoad";
const params = {
                    'clientId': '925737707646-cu0qpv4ca514ju45445fuvqj05t5qssd.apps.googleusercontent.com',
                    'scope': 'https://www.googleapis.com/auth/calendar.readonly',
                };

@Injectable()
export class GapiService {
    constructor(){}

    getApi():Promise<boolean> {
      let promise = new Promise((resolve, reject) => {
        window['_gapiOnLoad'] = (ev) => {
            window['gapi'].load('client', () => {
                window['gapi'].client.init(params)
                     .then(
                       (success) => resolve(true),
                       (error) => reject(false)
                     );
            });
        }
        this.loadScript()
      });

      this.getApi = () => promise;

      return promise;
    }

    loadScript(): void{
      let node = document.createElement('script');
      node.src = gapiUrl;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
    }

    login(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getApi()
                .then(function() {
                    var GoogleAuth = window['gapi'].auth2.getAuthInstance();

                    return GoogleAuth.isSignedIn.get()
                            ? resolve()
                            : GoogleAuth.signIn();
                }, reject);
        });
    }

    loadCalendars(): Promise<any> {
         return new Promise((resolve, reject) => {
             this.getApi()
                 .then(this.login.bind(this))
                 .then(() => {
                     return window['gapi'].client.load('calendar', 'v3');
                 }, reject)
                 .then(() =>  {
                     return window['gapi'].client.calendar.calendarList.list();
                 }, reject)
                 .then(function(resp) {
                     resolve(resp.result.items);
                 }, reject);
         });
       }

}
