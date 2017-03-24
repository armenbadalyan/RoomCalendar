// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  appery_base_url: 'https://api.appery.io/rest/1/code/',
  gapi_url: 'https://apis.google.com/js/api.js?onload=_gapiOnLoad',
  gapi_client_id: '83641542359-2pjb63pnqkv3fds7rejd9n119rik0ses.apps.googleusercontent.com',
  gapi_scope: 'https://www.googleapis.com/auth/calendar.readonly',
  google_base_calendar_url: 'https://calendar.google.com/calendar/render?cid=',

  gapi_server_url: 'https://room-calendar-google-api.herokuapp.com',
  gapi_server_events_url: '/api/events',
  gapi_server_calendars_url: '/api/calendars',
  gapi_server_insert_url: '/api/insert',

  use_client: false
};
