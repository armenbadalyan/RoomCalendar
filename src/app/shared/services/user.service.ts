import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

const loginURL = `${environment.appery_base_url}room_calendar_login_${environment.production ? 'prod' : 'dev'}/exec`;
const logoutURL = `${environment.appery_base_url}room_calendar_logout_${environment.production ? 'prod' : 'dev'}/exec`;
@Injectable()
export class UserService {

	currentUser: any = null;

	constructor(private http: Http) { }

	login(username, password): Observable<any> {
		return this.http.post(loginURL, {
			username: username,
			password: password
		}, {
				headers: new Headers({
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				})
			})
			.map(this.processLogin)
		//.catch(this.handleError)
	}

	logout(): Observable<any> {
		return this.http.post(logoutURL,
			{
				token: this.currentUser.sessionToken
			},
			{
				headers: new Headers({
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				})
			})
			.map(this.processLogin);
	}

	isLoggedIn() {
		return this.currentUser !== null;
	}

	processLogin = (response: Response): User => {
		let data: any = response.json();

		this.currentUser = (new User()).fromJSON(data);
		return this.currentUser;
	}

	/*private handleError(error: Response | any) {
		this.currentUser = null;
		return Observable.throw(error);
	}*/

}
