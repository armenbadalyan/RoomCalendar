import { Event } from '../app/shared';

const EVENTS_LIST_DATA = [
  {
    'kind': 'calendar#event',
    'etag': '2953892687216000',
    'id': 'oobl9mhk1mam0gqh5cs1qjvts4_20170228T073000Z',
    'status': 'confirmed',
    'htmlLink': 'https://www.google.com/calendar/event?eid=b29ibDltaGsxbWFtMGdxaDVjczFxanZ0c…9tXzJkMzYzMzM4MzIzNTM5MzkzNDM3MzkzNkByZXNvdXJjZS5jYWxlbmRhci5nb29nbGUuY29t', 
    'created': '2016-09-07T09:39:27.000Z',
    'updated': '2016-10-20T06:52:23.608Z',
    'summary': 'General English',
    'description': 'Grigorovich Svetlana',
    'location': 'Room-Minsk-304 (8)',
    'creator': {
        'email': 'zvasilenko@exadel.com'
    }, 'organizer': {
        'email': 'exadel.com_2d3633383235393934373936@resource.calendar.google.com',
        'displayName': 'Room-Minsk-304 (8)',
        'self': true
    }, 'start': {
        'dateTime': '2017-02-27T23:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'end': {
        'dateTime': '2017-02-28T02:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'recurringEventId': 'oobl9mhk1mam0gqh5cs1qjvts4', 'originalStartTime': {
        'dateTime': '2017-02-27T23:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'iCalUID': 'oobl9mhk1mam0gqh5cs1qjvts4@google.com', 'sequence': 0, 'attendees': [{
        'email': 'exadel.com_2d3633383235393934373936@resource.calendar.google.com',
        'displayName': 'Room-Minsk-304 (8)',
        'organizer': true,
        'self': true,
        'resource': true,
        'responseStatus': 'needsAction'
    }, {
        'email': 'shryharovich@exadel.com',
        'responseStatus': 'needsAction'
    }], 'reminders': {
        'useDefault': true
    }
  },
  {
    'kind': 'calendar#event',
    'etag': '2953892687216000',
    'id': 'oobl9mhk1mam0gqh5cs1qjvts4_20170228T073000Z',
    'status': 'confirmed',
    'htmlLink': 'https://www.google.com/calendar/event?eid=b29ibDltaGsxbWFtMGdxaDVjczFxanZ0c…9tXzJkMzYzMzM4MzIzNTM5MzkzNDM3MzkzNkByZXNvdXJjZS5jYWxlbmRhci5nb29nbGUuY29t', 
    'created': '2016-09-07T09:39:27.000Z',
    'updated': '2016-10-20T06:52:23.608Z',
    'summary': 'General English',
    'description': 'Grigorovich Svetlana',
    'location': 'Room-Minsk-304 (8)',
    'creator': {
        'email': 'zvasilenko@exadel.com'
    }, 'organizer': {
        'email': 'exadel.com_2d3633383235393934373936@resource.calendar.google.com',
        'displayName': 'Room-Minsk-304 (8)',
        'self': true
    }, 'start': {
        'dateTime': '2017-02-27T23:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'end': {
        'dateTime': '2017-02-28T02:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'recurringEventId': 'oobl9mhk1mam0gqh5cs1qjvts4', 'originalStartTime': {
        'dateTime': '2017-02-27T23:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'iCalUID': 'oobl9mhk1mam0gqh5cs1qjvts4@google.com', 'sequence': 0, 'attendees': [{
        'email': 'exadel.com_2d3633383235393934373936@resource.calendar.google.com',
        'displayName': 'Room-Minsk-304 (8)',
        'organizer': true,
        'self': true,
        'resource': true,
        'responseStatus': 'needsAction'
    }, {
        'email': 'shryharovich@exadel.com',
        'responseStatus': 'needsAction'
    }], 'reminders': {
        'useDefault': true
    }
  }
];

const EVENTS_LIST: Event[] = new Array(
  new Event().fromJSON(EVENTS_LIST_DATA[0]),
  new Event().fromJSON(EVENTS_LIST_DATA[1])
);

let startDate = new Date(),
    endDate = new Date();
startDate.setHours(endDate.getHours() - 1);
endDate.setHours(endDate.getHours() + 1);

const CURRENT_EVENT_DATA = {
    'kind': 'calendar#event',
    'etag': '2953892687216000',
    'id': 'oobl9mhk1mam0gqh5cs1qjvts4_20170228T073000Z',
    'status': 'confirmed',
    'htmlLink': 'https://www.google.com/calendar/event?eid=b29ibDltaGsxbWFtMGdxaDVjczFxanZ0c…9tXzJkMzYzMzM4MzIzNTM5MzkzNDM3MzkzNkByZXNvdXJjZS5jYWxlbmRhci5nb29nbGUuY29t', 
    'created': '2016-09-07T09:39:27.000Z',
    'updated': '2016-10-20T06:52:23.608Z',
    'summary': 'General English',
    'description': 'Grigorovich Svetlana',
    'location': 'Room-Minsk-304 (8)',
    'creator': {
        'email': 'zvasilenko@exadel.com'
    }, 'organizer': {
        'email': 'exadel.com_2d3633383235393934373936@resource.calendar.google.com',
        'displayName': 'Room-Minsk-304 (8)',
        'self': true
    }, 'start': {
        'dateTime': startDate.toISOString(),
        'timeZone': 'Europe/Minsk'
    }, 'end': {
        'dateTime': endDate.toISOString(),
        'timeZone': 'Europe/Minsk'
    }, 'recurringEventId': 'oobl9mhk1mam0gqh5cs1qjvts4', 'originalStartTime': {
        'dateTime': '2017-02-27T23:30:00-08:00',
        'timeZone': 'Europe/Minsk'
    }, 'iCalUID': 'oobl9mhk1mam0gqh5cs1qjvts4@google.com', 'sequence': 0, 'attendees': [{
        'email': 'exadel.com_2d3633383235393934373936@resource.calendar.google.com',
        'displayName': 'Room-Minsk-304 (8)',
        'organizer': true,
        'self': true,
        'resource': true,
        'responseStatus': 'needsAction'
    }, {
        'email': 'shryharovich@exadel.com',
        'responseStatus': 'needsAction'
    }], 'reminders': {
        'useDefault': true
    }
};

const CURRENT_EVENT: Event = new Event().fromJSON(CURRENT_EVENT_DATA);


const SINGLE_EVENT_DATA = EVENTS_LIST_DATA[0];

const SINGLE_EVENT = EVENTS_LIST[0];

export {
  EVENTS_LIST_DATA,
  EVENTS_LIST,
  CURRENT_EVENT_DATA,
  CURRENT_EVENT,
  SINGLE_EVENT_DATA,
  SINGLE_EVENT
};

