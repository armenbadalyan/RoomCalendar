import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ScrollDelegateService {

  private _updater:BehaviorSubject<any> = new BehaviorSubject<any>(0);

	public updater:Observable<any> = this._updater.asObservable();

  constructor() {}

  public refresh():void {
    this._updater.next(0);
  }

}
