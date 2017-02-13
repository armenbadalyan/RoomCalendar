import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Event, EventService } from '../../shared';

@Component({
	selector: 'room-status',
	templateUrl: './room-status.component.html',
	styleUrls: ['./room-status.component.scss']
})
export class RoomStatusComponent implements OnInit {

	public event:Event = null;	
	public nextEventTime:Date = null;

	public iconClasses = {}

	constructor(private eventService: EventService) { }

	ngOnInit() {
		
		this.eventService.laterEvents.subscribe(events => {
			let now = new Date();
			var todaysEvents = events.filter(event => {
				return event.startDate.toDateString() === now.toDateString();
			});			

			if (todaysEvents.length) {
				this.nextEventTime = todaysEvents[0].startDate;
			}
			else {
				this.nextEventTime = null;
			}
		});
		this.eventService.currentEvent.subscribe(event => {
			this.event = event;			
		});		
	}
}
