import { Component, OnInit } from '@angular/core';
import { PageService, Page } from '../shared';

@Component({
	selector: 'app-no-room',
	templateUrl: './no-room.component.html',
	styleUrls: ['./no-room.component.scss']
})
export class NoRoomComponent extends Page {

	constructor(pageService:PageService) {
		super(pageService);
	}

	get title() {
		return 'Please select a room';
	}

  get isTitleCentered() {
    return true;
  }

	get hasMenu() {
		return true;
	}

	ngOnInit() {
		super.ngOnInit();
	}

}
