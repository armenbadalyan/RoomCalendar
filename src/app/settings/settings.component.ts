import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition, UserService, SettingsService, CalendarService, PageService, Settings, Calendar  } from 'app/shared';
import { Subscription } from 'rxjs/Rx';
import { PageComponent, CustomComponent } from 'app/shared';

@CustomComponent({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends PageComponent implements OnDestroy {

  public isLoggingOut: Boolean = false;
  public isReady: Boolean = false;
  public settings: Settings = null;
  public calendarList: Calendar[] = [];

  private calendarsSubscription: Subscription;


  constructor(
    pageService: PageService,
    private router: Router,
    private userService: UserService,
    private settingsService: SettingsService) {

    super(pageService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.calendarsSubscription = this.settingsService.getCalendars().subscribe(calendars => {
      this.calendarList = calendars;
      this.isReady = !!this.calendarList.length;
    });

    this.settings = this.settingsService.settings;
    this.settingsService.update();
  }

  ngOnDestroy() {
    this.calendarsSubscription.unsubscribe();
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
