var express    = require('express');
var app        = express();
var google = require('googleapis');
var path    = require( 'path' );
var port = process.env.PORT || 8080;

process.env.GOOGLE_APPLICATION_CREDENTIALS = './RoomCalendar-24b15190878d.json'; 

app.use('/api', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
      res.sendStatus(200);
  } else {
      next();
  }
});

app.listen(port);

var key;
/*try {
  key = require( path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS) );
} catch (ex) { }*/


var IMPERSONATE_EMAIL = null;
var jwtClient = new google.auth.JWT(
  process.env.client_email || key.client_email,
  null,
  (process.env.private_key || key.private_key || "").replace(/\\n/g, '\n'),
  [ 'https://www.googleapis.com/auth/calendar.readonly' ],
  process.env.impersonate_email || null
);

jwtClient.authorize( function( err, tokens ) {
  if ( err ) {
    throw err;
  }

  google.options({
      auth: jwtClient
  });

  var calendar = google.calendar('v3');

  app.use('/api/calendars', function (req, res, next) {
    calendar.calendarList.list({}, function (err, result) {
      res.json(result);
    });
  });

  app.use('/api/events', function (req, res, next) {
      console.log(req.query.time);
      calendar.events.list({
          showDeleted: false,
          singleEvents: true,
          orderBy: 'startTime',
          calendarId: req.query.calendarId,//"exadel.com_r3q9h37o34e2ogamdokh9ht8k4@group.calendar.google.com", // 
          timeMin: req.query.time,//"2017-02-28T10:57:09.556Z",//req.query.time,
          maxResults: req.query.limit || 10,
      }, function (err, result) {
          res.json(result);
      });
  });
  
});