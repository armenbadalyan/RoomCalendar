import { Component, OnInit } from '@angular/core';
import { PageService } from 'app/shared/services';
import { Subscription } from 'rxjs/Rx';
import { routerTransition } from 'app/shared/animations';
import { Observable } from 'rxjs/Rx';

// Can't declate Abstract Component because AoT build fails
// (because Abstact Component cannot be declared inside module)
@Component({
  template: '<div></div>',
  animations: [routerTransition()],
  host: {
    '[@routerTransition]': ''
  }
})
export class PageComponent implements OnInit {

  constructor(protected pageService: PageService) { }

  get title(): Observable<string> | string {
    return '';
  }
  get hasMenu(): boolean {
    return false;
  };
  get isTitleCentered(): boolean {
    return false;
  };

  ngOnInit() {
    this.pageService.notifyPageInit(this);
  }
}
