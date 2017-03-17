import { Serializable } from './serializable' 

export class User implements Serializable<User>{

	id: string;
	username: string;
	sessionToken: string;

	fromJSON(json:any) {
		this.id = json.user._id;
		this.username = json.user.username;
		this.sessionToken = json.token;
		
		return this;
	}
}