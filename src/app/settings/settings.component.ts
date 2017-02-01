import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  maxEvents = 10;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  onLogout() {
  	this.userService.logout()
  	.subscribe(
  		success => {
  			// navigate to login
  			this.router.navigate(['/login']);
  		},
  		error => {

  		});
  }


}
