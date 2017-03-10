import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { PageComponent } from 'app/shared/components';

@Injectable()
export class PageService {
  // Observable string sources
  private pageInitializedSource = new Subject<PageComponent>();

  // Observable string streams
  pageInitialized = this.pageInitializedSource.asObservable();

  notifyPageInit(page: PageComponent) {
    this.pageInitializedSource.next(page);
  }
}
