// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  appery_base_url: 'https://api.appery.io/rest/1/code/',
  gapi_url: 'https://apis.google.com/js/api.js?onload=_gapiOnLoad',
  gapi_client_id: '925737707646-cu0qpv4ca514ju45445fuvqj05t5qssd.apps.googleusercontent.com',
  gapi_scope: 'https://www.googleapis.com/auth/calendar.readonly'
};
