import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, PageService, Page } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Page {

  username = '';
  password = '';
  hasError = false;
  isAuthenticating = false;
  formClasses = {
  	error: false,
  	loading: false

  };

  constructor(pageService:PageService, private userService:UserService, private router:Router) {
    super(pageService);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  get title() {
    return 'Login';
  }

  get hasBack() {
    return true;
  }

  get hasMenu() {
    return false;
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
