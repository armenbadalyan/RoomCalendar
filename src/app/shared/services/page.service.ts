import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Page } from '../models';

@Injectable()
export class PageService {
  // Observable string sources
  private pageInitializedSource = new Subject<Page>();
  
  // Observable string streams
  pageInitialized = this.pageInitializedSource.asObservable();

  notifyPageInit(page: Page) {
    this.pageInitializedSource.next(page);
  }

}