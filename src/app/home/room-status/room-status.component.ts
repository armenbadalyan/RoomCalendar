import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Event, EventService } from '../../shared';

@Component({
  selector: 'room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomStatusComponent/* implements OnInit*/ {
  @Input()
  public event: Event = null;

	@Input()
	set laterEvents(events: Event[]) {
			let now = new Date();
			let todaysEvents = events.filter(event => 
				event.startDate.toDateString() === now.toDateString()
			);

			this.nextEventTime = todaysEvents.length ? todaysEvents[0].startTime || null : null;
	}

	public nextEventTime: Date = null;

	constructor() { }
}
