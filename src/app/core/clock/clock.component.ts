import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.scss']	
})
export class ClockComponent implements OnInit, OnDestroy {

	time:Date = new Date();

	private timer:number;

	constructor(private zone:NgZone, private  cd: ChangeDetectorRef) {
		this.runFnBind = this.run.bind(this);
	}

	ngOnInit() {
		this.zone.runOutsideAngular(this.runFnBind);
	}

	ngOnDestroy() {
		clearTimeout(this.timer);
	}

	run() {		
		this.time = new Date();
		this.cd.detectChanges();
		this.timer = setTimeout( this.runFnBind, 1000);
	}

	private runFnBind: any = null;

}
