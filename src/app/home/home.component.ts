import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, Event, PageService, Page, Calendar } from '../shared';
import { BehaviorSubject } from 'rxjs/Rx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends Page {

  private calendar: BehaviorSubject<Calendar> = new BehaviorSubject(null);

  public laterEventsList: Event[];
  public currentEvent: Event;


  constructor(pageService: PageService,
    private eventService: EventService,
    private route: ActivatedRoute) {
    super(pageService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.data.subscribe((data: { calendar: Calendar }) => {
      this.calendar.next(data.calendar);
    });

    this.eventService.laterEvents
      .subscribe(
      events => {
        this.laterEventsList = events;
      },
      error => {
      });

    this.eventService.currentEvent
      .subscribe(
      event => {
        this.currentEvent = event;
      },
      error => {
      });
  }

  get title() {
    return this.calendar
      .map(c => {
        return c.title;
      });
  }

  get hasBack() {
    return true;
  }

  get hasMenu() {
    return true;
  }

}
