import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

const CLOCK_UPDATE_TIMER = 1000;

@Component({
	selector: 'clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClockComponent implements OnInit, OnDestroy {

	public time: Date = new Date();

	private timer: number;

	constructor(private zone: NgZone, private  cd: ChangeDetectorRef) {
		this.runFnBind = this.run.bind(this);
		this.time = new Date();
		this.time.setMilliseconds(0);
		this.time.setSeconds(0);
	}

	ngOnInit() {
		this.zone.runOutsideAngular(this.runFnBind);
	}

	ngOnDestroy() {
		clearTimeout(this.timer);
	}

	run() {		
		let newTime = new Date();
		newTime.setSeconds(0);
		newTime.setMilliseconds(0);

		if(newTime.toString() != this.time.toString()) {
			this.time = newTime;
			this.cd.detectChanges();
		}
		this.timer = setTimeout( this.runFnBind, CLOCK_UPDATE_TIMER);
	}

	private runFnBind: any = null;

}
