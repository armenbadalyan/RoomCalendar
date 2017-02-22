import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PageService, Page } from '../../../shared';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
	selector: 'layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public title: Observable<string>;
	public hasBack: boolean;
	public hasMenu: boolean;
	public hasClock: boolean;
	public isTitleCentered: boolean;


	constructor(private location: Location, private pageService:PageService, private router: Router) { }

	ngOnInit() {

		this.pageService.pageInitialized.subscribe(page => {

			if (page.title instanceof Observable) {
				this.title = page.title;

			}
			else {
				this.title = Observable.create(function (observer) {
					observer.next(page.title);
					observer.complete();
				});
			}

			this.hasMenu = page.hasMenu;
			this.isTitleCentered = page.isTitleCentered;
		});
	}

	goToSettings() {
		this.router.navigate(['/settings']);
	}

}
