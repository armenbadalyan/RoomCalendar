import { Serializable } from './serializable'

export class Event implements Serializable<Event>{

	id: string;
	title: string;
	author: string;
	startDate: Date;
	endDate: Date;

	fromJSON(json:any) {
		this.id = json.id;
		this.title = json.summary;
		this.author = json.creator ? json.creator.email : null;
		this.startDate = json.start ? new Date(json.start.dateTime): null;
		this.endDate = json.end ? new Date(json.end.dateTime): null; 

		return this;
	}
}
