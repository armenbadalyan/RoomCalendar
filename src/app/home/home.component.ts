import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared';
import { Event } from '../shared/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public eventList: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.events
      .subscribe(
        events => {
          this.eventList = events;
        },
        error => {
        });

    this.eventService.getEvents();
  }

}
