import { OnInit } from '@angular/core';
import { PageService } from 'app/shared/services';
import { Observable } from 'rxjs/Rx';
import { routerTransition } from 'app/shared/animations';

export abstract class PageComponent implements OnInit {

  static animations = [routerTransition()];

  static host = {
    '[@routerTransition]': ''
  };

  constructor(protected pageService: PageService) {

  }

  abstract get title(): Observable<string> | string;
  abstract get hasMenu(): boolean;
  abstract get isTitleCentered(): boolean;

  ngOnInit() {
    this.pageService.notifyPageInit(this);
  }
}
