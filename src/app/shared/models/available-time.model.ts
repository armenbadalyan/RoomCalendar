export class AvailableTime {
  value: number;
  title: string;

  constructor(value: number, title: string) { 
    this.value = value;
    this.title = title;
  }

  equals(time: AvailableTime) {
    return time.value === this.value;
  }
}
