import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GapiService } from './gapi.service';

export class Calendar {
  constructor(public title:string, public id:string){}
}

@Injectable()
export class CalendarService {

  private _calendars: BehaviorSubject<Calendar[]> = new BehaviorSubject([]);

  public calendars: Observable<Calendar[]> = this._calendars.asObservable();

	constructor(private gapi:GapiService) {}

  getCalendars(): void {
      /*this.gapi.loadCalendars().then(function(resp) {
        console.log(resp);
      });*/
      setTimeout(() => {
        let list:Calendar[] = [
          new Calendar('Test', "1"),
          new Calendar('Test2', "2"),
          new Calendar('Test3', "3")
        ];

        this._calendars.next(list);
      }, 2000);
  }

}
