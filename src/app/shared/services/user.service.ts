import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const loginURL = 'https://api.appery.io/rest/1/code/room_calendar_login_dev/exec';
const logoutURL = 'https://api.appery.io/rest/1/code/room_calendar_logout_dev/exec';
//const DB_ID = '5874c181e4b07690afedf74a';

@Injectable()
export class UserService {

	currentUser: any = null;

	constructor(private http: Http) { }

	login(username, password):Observable<any> {
		return this.http.post(loginURL, {
		   		username: username,
		    	password: password
		    }, {
			headers: new Headers({
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			})
		})
		.map(this.processUser)
		.catch(this.handleError)
	}

	logout():Observable<any> {
			return this.http.post(logoutURL,
				{
					token: this.currentUser
				},
				{
					headers: new Headers({
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					})
				})
			.map(this.processUser)
			.catch(this.handleError)
	}

	isLoggedIn() {
		return this.currentUser !== null;
	}

	private processUser(response: Response) {
		let data = response.json();
		if(data.success) {
			this.currentUser = data.token;
		}
		return data;
	}

	private handleError(error: Response | any) {
		//this.currentUser = null;
		return Observable.throw(error);
	}

	private unprocessUser(response: Response) {
		let data = response.json();
		if(data.success) {
			this.currentUser = null;
		}
		return data;
	}

}