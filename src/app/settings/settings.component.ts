import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared';
import { SettingsService } from '../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private userService:UserService, private router:Router, private settings:SettingsService) { }

  ngOnInit() {
    this.settings.update();
  }

  onCalendarSelect() {
    this.settings.storeCurrentCalendar();
  }

  onLogout(): void {
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
