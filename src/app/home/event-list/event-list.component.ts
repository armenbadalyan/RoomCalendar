import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChange  } from '@angular/core';
import { EventService, Event } from '../../shared';
import { CustomScrollComponent } from '../../core/custom-scroll/custom-scroll.component';

@Component({
	selector: 'event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

	@Input()
	public events: Event[];

	@ViewChild(CustomScrollComponent)
  private customScrollComponent: CustomScrollComponent;

	constructor() { }

	ngOnInit() {

	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		setTimeout(() => {
			this.customScrollComponent.update();
		});
	}

}
