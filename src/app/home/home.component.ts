import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared';
import { Event } from '../shared/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public laterEventsList: Event[];

  public currentEvent: Event;

  constructor(private eventService: EventService) { }

  ngOnInit() {
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

    this.eventService.getEvents();
  }

}
