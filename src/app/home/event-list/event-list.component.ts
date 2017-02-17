import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChange, NgZone, ChangeDetectorRef  } from '@angular/core';
import { EventService, Event, ScrollDelegateService } from '../../shared';

@Component({
	selector: 'event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

	@Input()
	public events: Event[];

	constructor(private zone: NgZone, private cd: ChangeDetectorRef, private scrollDelegate:ScrollDelegateService) {
		this.refreshScrollBind = this.refreshScroll.bind(this);
	}

	ngOnInit() {
		this.zone.runOutsideAngular(this.refreshScrollBind);
	}

	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		this.refreshScrollBind();
	}

	private refreshScroll() {
		setTimeout(()=> {
			this.scrollDelegate.refresh();
			this.cd.detectChanges();
		});
	}

	private refreshScrollBind: any = null;

}
