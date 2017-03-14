import { Component, OnInit } from '@angular/core';
import { PageComponent, PageService } from 'app/shared';

@Component({
	selector: 'app-no-room',
	templateUrl: './no-room.component.html',
	styleUrls: ['./no-room.component.scss'],
  animations: PageComponent.animations,
  host: PageComponent.host
})
export class NoRoomComponent extends PageComponent {

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
