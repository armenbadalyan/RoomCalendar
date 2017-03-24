export const environment = {
  production: true,
  appery_base_url: 'https://api.appery.io/rest/1/code/',
  gapi_url: 'https://apis.google.com/js/api.js?onload=_gapiOnLoad',
  gapi_client_id: '925737707646-cu0qpv4ca514ju45445fuvqj05t5qssd.apps.googleusercontent.com',
  gapi_scope: 'https://www.googleapis.com/auth/calendar.readonly',
  google_base_calendar_url: 'https://calendar.google.com/calendar/render?cid=',

  gapi_server_url: 'https://room-calendar-google-api.herokuapp.com',
  gapi_server_events_url: '/api/events',
  gapi_server_calendars_url: '/api/calendars',
  gapi_server_insert_url: '/api/insert',

  use_client: false
};
