import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

	time:Date = new Date();

	constructor() { }

	ngOnInit() {
		setInterval(() => {
			this.time = new Date();
		});
	}

}
