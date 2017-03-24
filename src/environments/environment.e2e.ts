export const environment = {
  production: false,
  appery_base_url: '/',
  gapi_url: 'https://apis.google.com/js/api.js?onload=_gapiOnLoad',
  gapi_client_id: '83641542359-2pjb63pnqkv3fds7rejd9n119rik0ses.apps.googleusercontent.com',
  gapi_scope: 'https://www.googleapis.com/auth/calendar.readonly',
  google_base_calendar_url: 'https://calendar.google.com/calendar/render?cid=',
  PORT: 3000,

  gapi_server_url: 'https://room-calendar-google-api.herokuapp.com',
  gapi_server_events_url: '/api/events',
  gapi_server_calendars_url: '/api/calendars',
  gapi_server_insert_url: '/api/insert',
}; 
