import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, Event, PageService, SettingsService, Page, Calendar } from 'app/shared';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends Page implements OnDestroy {

  private calendar: BehaviorSubject<Calendar> = new BehaviorSubject(null);
  private laterEventsSubscription: Subscription;
  private currentEventSubscription: Subscription;

  public laterEventsList: Event[] = [];
  public currentEvent: Event = null;


  constructor(pageService: PageService,
    private settingsService: SettingsService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) {
    super(pageService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.data.subscribe((data: { calendar: Calendar }) => {
      this.calendar.next(data.calendar);
    });

    this.laterEventsSubscription = this.eventService.laterEvents
      .subscribe(
      events => {
        this.laterEventsList = events;
        this.cd.markForCheck();
      },
      error => {
      });

    this.currentEventSubscription = this.eventService.currentEvent
      .subscribe(
      event => {
        this.currentEvent = event;
        this.cd.markForCheck();
      },
      error => {
      });

    this.eventService.restartPolling();
  }

  ngOnDestroy() {
    this.laterEventsSubscription.unsubscribe();
    this.currentEventSubscription.unsubscribe();
  }

  get title() {
    return this.calendar
      .map(c => {
        return c.title;
      });
  }

  get isTitleCentered() {
    return false;
  }

  get hasMenu() {
    return true;
  }

  get calendarUrl() {
    return this.settingsService.selectedCalendarUrl;
  }

}
