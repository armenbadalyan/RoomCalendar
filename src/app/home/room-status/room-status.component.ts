import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../shared/models/event.model';

@Component({
	selector: 'room-status',
	templateUrl: './room-status.component.html',
	styleUrls: ['./room-status.component.scss']
})
export class RoomStatusComponent implements OnInit {

	private _event:Event = null;

	@Input()
	public set event(value) {
		if (this._event !== value) {
			this._event = value;
			this.updateProperties()
		}		
	}

	public get event():Event {
		return this._event;
	}

	public iconClasses = {}

	constructor() { }

	ngOnInit() {
		this.updateProperties();
	}

	private updateProperties() {
		this.updateIconClasses();
	}

	private updateIconClasses() {
		this.iconClasses['room-status__icon--busy'] = !!this.event;
		this.iconClasses['room-status__icon--free'] = !this.event;
	}

}
