import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, SettingsService, CalendarService, PageService, Page, Settings, Calendar  } from '../shared';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends Page implements OnDestroy {

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
