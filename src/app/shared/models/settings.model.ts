import { Serializable } from './serializable';
import { Calendar } from './calendar.model';

export class Settings {

  public maxEvents: number;
  public selectedCalendarId: string;

  constructor(obj:any = {}) {
    this.maxEvents = Number.isInteger(obj.maxEvents) ? obj.maxEvents : 10;
    this.selectedCalendarId = typeof obj.selectedCalendarId === "string" ? obj.selectedCalendarId : "";
  }
}
