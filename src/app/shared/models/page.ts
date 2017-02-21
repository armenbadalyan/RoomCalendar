import { OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Observable } from 'rxjs/Rx';

export abstract class Page implements OnInit {

	constructor(protected pageService:PageService) {

	}

	abstract get title():Observable<string> | string;
	abstract get hasMenu():boolean;
	abstract get isTitleCentered(): boolean;

	ngOnInit() {
		this.pageService.notifyPageInit(this);
	}
}
