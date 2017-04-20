import { Event } from './event.model';
//import { SINGLE_EVENT, SINGLE_EVENT_DATA } from '../../../testing';


describe ('Event Model', () => {

  it('should construct', () => {
    expect(new Event()).toBeDefined();
  });

  it('should set date and time when startTime and endTime are set', () => {
    let event = new Event();
    event.fromJSON({
      'start': {
        'dateTime': '2017-02-27T23:30:00-08:00',
        'timeZone': 'Europe/Minsk'
      },
      'end': {
        'dateTime': '2017-02-28T02:30:00-08:00',
        'timeZone': 'Europe/Minsk'
      }
    });
    expect(event.startDate).toBeTruthy();
    expect(event.startTime).toBeTruthy();
    expect(event.startDate).toEqual(event.startTime);

    expect(event.endDate).toBeTruthy();
    expect(event.endTime).toBeTruthy();
    expect(event.endDate).toEqual(event.endTime);
  });

  it('should set date correctly when only start and end dates are set', () => {
    let event = new Event();
    event.fromJSON({
      'start': {
        'date': '2017-02-18'
      },
      'end': {
        'date': '2017-05-19'
      }
    });
    expect(event.startDate).toBeTruthy();
    expect(event.endDate).toBeTruthy();

    expect(event.startTime).toBeNull();
    expect(event.endTime).toBeNull();
  });

  it('should define Multi Day events', () => {
    let event = new Event();
    event.fromJSON({
      'start': {
        'date': '2017-02-18'
      },
      'end': {
        'date': '2017-05-19'
      }
    });
    expect(event.isMultiDay).toBe(true);
  });

  it('should set title when it is not defined', () => {
    let event = new Event();
    event.fromJSON({
      'start': {
        'date': '2017-02-18'
      },
      'end': {
        'date': '2017-05-19'
      }
    });
    expect(event.title).toBe('No Title');
  });

  it('should compare events with the same data correctly', () => {
    let event_1 = new Event();
    let event_2 = new Event();
    let date = new Date();
    event_1.fromJSON({
      'summary': 'Test',
      'start': {
        'date': new Date(date).toISOString()
      },
      'end': {
        'date': new Date(date).toISOString()
      }
    });
    event_2.fromJSON({
      'summary': 'Test',
      'start': {
        'date': new Date(date).toISOString()
      },
      'end': {
        'date': new Date(date).toISOString()
      }
    });
    expect(event_1.equals(event_2)).toBe(true);
  });

});
