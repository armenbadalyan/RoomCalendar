import { Serializable } from './serializable'

export class Calendar implements Serializable<Calendar>{

	id: string;
	title: string;
	location: string;
  description: string;

	fromJSON(json:any) {
		this.id = json.id;
		//TODO: split from GoogleAPI and from localStorage
		this.title = json.summary || json.title;
		this.location = json.location;
		this.description = json.description;

		return this;
	}

	toJSON():any {
		return {
			id: this.id,
			title: this.title,
			location: this.location,
			description: this.description
		};
	}

	toString(): string {
		return JSON.stringify(this.toJSON());
	}
}
