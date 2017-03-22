import { Calendar } from '../app/shared';

const CALENDAR_LIST_DATA = [
  {
    id: '0',
    summary: 'Room-test-1',
    location: 'Somewhere',
    description: 'A calendar room'
  },
  {
    id: '1',
    title: 'Room-test-2',
    location: 'Somewhere',
    description: 'A calendar room 2'
  },
  {
    id: '2',
    summary: 'Room-test-3',
    location: 'Somewhere',
    description: 'A calendar room 3'
  }
];

const CALENDAR_LIST = [
  new Calendar().fromJSON(CALENDAR_LIST_DATA[0]),
  new Calendar().fromJSON(CALENDAR_LIST_DATA[1]),
  new Calendar().fromJSON(CALENDAR_LIST_DATA[2])
];

const SINGLE_CALENDAR = CALENDAR_LIST[0];

const CALENDAR_EXISTING_ID = '1';
const CALENDAR_NON_EXISTING_ID = '10';

export { 
  CALENDAR_LIST_DATA,
  CALENDAR_LIST,
  CALENDAR_EXISTING_ID,
  CALENDAR_NON_EXISTING_ID,
  SINGLE_CALENDAR
};
