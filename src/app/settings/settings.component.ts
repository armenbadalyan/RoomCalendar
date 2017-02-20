import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, SettingsService, CalendarService, PageService, Page, Settings, Calendar  } from '../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends Page {

  private isLoggingOut: boolean = false;
  private isReady: boolean = false;
  private settings: Settings = null;
  private calendarList: Calendar[] = [];

  constructor(
    pageService: PageService,
    private router: Router,
    private userService: UserService,
    private settingsService: SettingsService) {

    super(pageService);

    settingsService.getCalendars().subscribe(calendars => {
      this.calendarList = calendars;
      this.isReady = !!this.calendarList.length;
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.settings = this.settingsService.settings;
    this.settingsService.update();
  }

  get title() {
    return 'Settings';
  }

  get isTitleCentered() {
    return true;
  }

  get hasMenu() {
    return true;
  }

  goToEvents() {
    this.router.navigate(['/']);
  }

  save() {
    this.settingsService.settings = this.settings;
  }

  onLogout(): void {
    this.save();
    this.isLoggingOut = true;
    this.userService.logout()
      .finally(
      () => {
        this.isLoggingOut = false;
      })
      .subscribe(
      success => {
        this.goToEvents();
      },
      error => {

      });
  }

}
