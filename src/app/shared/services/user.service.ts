import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


const loginURL = 'https://api.appery.io/rest/1/db/login';
const DB_ID = '5874c181e4b07690afedf74a';

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
				'Accept': 'application/json',
				'X-Appery-Database-Id': DB_ID
			})
		})
		.map(this.processUser)
		.catch(this.handleError)
	}

	logout() {

	}

	isLoggedIn() {
		return this.currentUser !== null;
	}

	private processUser(response: Response) {
		var data = response.json();
		this.currentUser = data;
		return data;
	}

	private handleError(error: Response | any) {
		this.currentUser = null;
		return Observable.throw(error);
	}

}