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
		this.title = json.summary;
		this.author = json.creator ? json.creator.email : null;

		this.startDate = json.start ? new Date(json.start.dateTime || json.start.date): null;
		this.startTime = json.start && json.start.dateTime ? new Date(json.start.dateTime) : null;

		this.endDate = json.end ? new Date(json.end.dateTime || json.end.date): null;
		this.endTime = json.end && json.end.dateTime ? new Date(json.end.dateTime) : null;

		this.isMultiDay = this.startDate.toDateString() === this.endDate.toDateString();

		return this;
	}
}
