import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.model';

@Component({
	selector: 'event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

	@Input()
	public events: Event[];

	constructor() { }

	ngOnInit() {
		
	}

}
