import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  hasError = false;
  isAuthenticating = false;
  formClasses = {
  	error: false,
  	loading: false

  };

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit() {
  	this.hasError = false;
  	this.isAuthenticating = true;
  	

  	this.userService.login(this.username, this.password)
  	.finally(
  		() => {
  			this.isAuthenticating = false;
  	})
  	.subscribe(
  		user => {
  			// navigate to settings
  			this.router.navigate(['/settings']);
  		},
  		error => {
  			this.hasError = true;
  		});
  }

}
