import { Component, OnInit, OnDestroy, Input, NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { GapiServerService, AvailableTime, BookingModel } from 'app/shared';

const MILLISECONDS_IN_MINUTE = 60000;
const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;

const AVAILABLE_MINUTES_TIMES: Array<number> = [3, 15, 30];
const TIMER_UPDATE = 60000;
const MESSAGE_SHOW_DURATION = 15000;

interface Message {
  text: string,
  isError: boolean
}

@Component({
  selector: 'quick-booking',
  templateUrl: './quick-booking.component.html',
  styleUrls: ['./quick-booking.component.scss']
})
export class QuickBookingComponent implements OnInit, OnDestroy {

  private _nextEvent: Date;

  private timer: number;

  private timerForMessage: number;

  private runDetectionBind: any;

  private availableTimesSubject: BehaviorSubject<AvailableTime[]> = new BehaviorSubject([]);

  private availableTimesObservable: Observable<AvailableTime[]> = 
        this.availableTimesSubject.asObservable().distinctUntilChanged(this.checkTimesChanges);

  private avaiableTimesSubscription: Subscription;

  public availableTimes: AvailableTime[] = [];

  public bookingModel: BookingModel;

  public message: Message;

  @Input() 
  set calendarId(calendarId: string) {
    this.bookingModel.calendarId = calendarId;
  }

  @Input()
  set nextEvent(nextDate: Date) {

    this._nextEvent = nextDate || this.getTomorrowMidnight();

    this.detectAvailableTimes();

		clearTimeout(this.timer);
    
    this.timer =  setTimeout(this.runDetectionBind, TIMER_UPDATE);
  }

	constructor(private zone: NgZone, private  cd: ChangeDetectorRef, private gapiServer: GapiServerService) {
    this.bookingModel = new BookingModel();
    this.runDetectionBind = this.runDetection.bind(this);
    this.message = {
      text: "",
      isError: false
    };
  }

  ngOnInit() {
    this.zone.runOutsideAngular(this.runDetectionBind);

    this.avaiableTimesSubscription = this.availableTimesObservable.subscribe((timeList) => {
      this.availableTimes = timeList;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
		clearTimeout(this.timer);
    if(this.timerForMessage) {
      clearTimeout(this.timerForMessage);
    }
    this.avaiableTimesSubscription.unsubscribe();
  }

  getTomorrowMidnight(): Date {
    let date = new Date();
    date.setHours(24,0,0,0);
    return date;
  }

  checkTimesChanges(xArr: AvailableTime[], yArr: AvailableTime[]): boolean {
    if (xArr.length !== yArr.length) {
      return false;
    }
    return xArr.reduce((isChanged, xCurr, i) => {
      return isChanged && xCurr.equals(yArr[i])
    }, true);

  }

  runDetection(): void {
    this.detectAvailableTimes();
    this.timer =  setTimeout(this.runDetectionBind, TIMER_UPDATE);
  }

  detectAvailableTimes(): void {
    let times: Array<AvailableTime> = [];

    if(this._nextEvent) {
      let now: Date = new Date();
      let diff: number = this._nextEvent.valueOf() - now.valueOf();

      let minutes: number = Math.floor(diff / MILLISECONDS_IN_MINUTE);
      let hours: number = Math.floor(diff / MILLISECONDS_IN_HOUR);
      let hour = 1;

      AVAILABLE_MINUTES_TIMES.filter((time) => time <= minutes).forEach((time) => {
        times.push(new AvailableTime(time * MILLISECONDS_IN_MINUTE, time + ' minutes'));
      });

      while(hour <= hours) {
        times.push(new AvailableTime(hour * MILLISECONDS_IN_HOUR, hour + ' hour' + (hours > 1 ? 's' : '')));
        hour++;
      }
    }

    this.availableTimesSubject.next(times);
  }

  book(quickBookForm: any): void {
    let start = this.bookingModel.start || new Date(),
        end = new Date(start.valueOf() + this.bookingModel.timeInterval);

    this.gapiServer
      .insertEvent(this.bookingModel.calendarId, this.bookingModel.eventTitle, this.bookingModel.email, start.toISOString(), end.toISOString())
      .subscribe(response => {
        if(response.success) {
          quickBookForm.reset();
          this.handleMessage("Event successfully added.");
        } else {
          this.handleMessage("Error occurred. Please try again later.", true)
        }
    });
  }

  handleMessage(text: string = "", isError: boolean = false): void {
      if(this.timerForMessage) {
        clearTimeout(this.timerForMessage);
      }

      this.message.text = text;
      this.message.isError = isError;
      this.cd.detectChanges();

      if(this.message.text) {
        this.timerForMessage = setTimeout(this.handleMessage.bind(this), MESSAGE_SHOW_DURATION);
      }
  }
}
