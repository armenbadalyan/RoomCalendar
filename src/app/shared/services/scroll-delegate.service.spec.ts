import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { ScrollDelegateService } from './scroll-delegate.service';

describe ('ScrollDelegateService', () => {
  let scrollDelegateService;

  beforeEach(() => {
    scrollDelegateService = new ScrollDelegateService();
  });

  it('should construct', () => {
      expect(scrollDelegateService).toBeDefined();
  });

  it('should update when refreshed', async(() => {
      scrollDelegateService.refresh();
      scrollDelegateService.updater.subscribe(list => {
        expect(list).toEqual(0);
      }, error => {

      });
  }));
});
