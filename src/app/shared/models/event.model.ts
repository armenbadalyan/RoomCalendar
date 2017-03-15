import { Serializable } from './serializable'

export class Event implements Serializable<Event>{

	id: string;
	title: string;
	author: string;
	startDate: Date;
	endDate: Date;
	startTime: Date;
	endTime: Date;
	isMultiDay: boolean;

	fromJSON(json:any) {
		this.id = json.id;
		this.title = json.summary || 'No Title';
		this.author = json.creator ? json.creator.email : null;

		this.startDate = json.start ? new Date(json.start.dateTime || json.start.date): null;
		this.startTime = json.start && json.start.dateTime ? new Date(json.start.dateTime) : null;

		this.endDate = json.end ? new Date(json.end.dateTime || json.end.date): null;
		this.endTime = json.end && json.end.dateTime ? new Date(json.end.dateTime) : null;

		this.isMultiDay = this.startDate.toDateString() !== this.endDate.toDateString();

		return this;
	}

	private compareDates(date_1: Date, date_2: Date): boolean {
		return (date_1 ? date_1.valueOf() : date_1)  === (date_2 ? date_2.valueOf() : date_2);
	}

	equals (event: Event) {
		return event.id == this.id
			&& event.title == this.title
			&& event.author == this.author
			&& this.compareDates(event.startDate, this.startDate)
			&& this.compareDates(event.startTime, this.startTime)
			&& this.compareDates(event.endDate, this.endDate)
			&& this.compareDates(event.endTime, this.endTime);
	}
}
