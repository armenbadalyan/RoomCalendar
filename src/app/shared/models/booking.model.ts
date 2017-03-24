export class BookingModel {
  email: string;
  eventTitle: string;
  calendarId: string;
  timeInterval: number;
  start: Date;

  constructor(email: string = "", eventTitle: string = "", calendarId: string = "", timeInterval: number = null, start: Date = null) { 
    this.email = email;
    this.eventTitle = eventTitle;
    this.calendarId = calendarId;
    this.timeInterval = timeInterval;
    this.start = start;
  }
}
