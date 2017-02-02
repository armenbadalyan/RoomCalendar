import { Serializable } from './serializable'

export class Calendar implements Serializable<Calendar>{

	id: string;
	title: string;
	location: string;
  description: string;

	fromJSON(json:any) {
		this.id = json.id;
		this.title = json.summary;
		this.location = json.location;
		this.description = json.description;

		return this;
	}
}
