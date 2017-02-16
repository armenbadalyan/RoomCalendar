import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.scss']	
})
export class ClockComponent implements OnInit {

	time:Date = new Date();

	constructor(private zone:NgZone, private  cd: ChangeDetectorRef) {
		this.runFnBind = this.run.bind(this);
	}

	ngOnInit() {
		this.zone.runOutsideAngular(this.runFnBind);
	}

	run() {
		this.time = new Date();
		this.cd.detectChanges();
		setTimeout( this.runFnBind, 1000)
	}

	private runFnBind: any = null;

}
