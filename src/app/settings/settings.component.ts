import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, SettingsService, PageService, Page } from '../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends Page {

  isLoggingOut: boolean = false;

  constructor(
    pageService: PageService,
    private userService: UserService,
    private router: Router,
    private settings: SettingsService) {

    super(pageService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.settings.update();
  }

  get title() {
    return 'Settings';
  }

  get hasBack() {
    return true;
  }

  get hasMenu() {
    return true;
  }

  get hasClock() {
    return false;
  }

  onCalendarSelect() {
    this.settings.storeCurrentCalendar();
  }

  onLogout(): void {
    this.isLoggingOut = true;
    this.userService.logout()
      .finally(
      () => {
        this.isLoggingOut = false;
      })
      .subscribe(
      success => {
        // navigate to login
        this.router.navigate(['/']);
      },
      error => {

      });
  }

}
