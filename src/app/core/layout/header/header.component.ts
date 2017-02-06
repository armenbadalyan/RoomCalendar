import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PageService, Page } from '../../../shared';

@Component({
	selector: 'layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	public title: string;
	public hasBack: boolean;
	public hasMenu: boolean;


	constructor(private location: Location, private pageService:PageService) { }

	ngOnInit() {

		this.pageService.pageInitialized.subscribe(page => {
			this.title = page.title;
			this.hasBack = page.hasBack;
			this.hasMenu = page.hasMenu;
		});

		/*this.router.events.subscribe(event => {

			let childRoute = this.route.firstChild;

			if (event instanceof NavigationEnd && childRoute ) {
				console.log('has child route');

				if (childRoute.component instanceof Page) {
					console.log('is a page');

					this.currentPage = childRoute.component as Page;
					this.title = this.currentPage.title;
					this.hasBack = this.currentPage.hasBack;
					this.hasMenu = this.currentPage.hasMenu;
				}
				else {
					console.log('is not a page');
				}

			}

		});*/
	}

	goBack() {
		this.location.back()
	}

}
