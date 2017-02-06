import { OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

export abstract class Page implements OnInit {

	constructor(protected pageService:PageService) {
		
	}

	abstract get hasBack():boolean;
	abstract get title():string;
	abstract get hasMenu():boolean;

	ngOnInit() {
		this.pageService.notifyPageInit(this);
	}
}