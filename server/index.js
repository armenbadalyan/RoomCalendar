var express    = require('express');
var app        = express();
var port = process.env.PORT || 8080;
var google = require('googleapis');

process.env.GOOGLE_APPLICATION_CREDENTIALS = './project.json'; 

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

google.auth.getApplicationDefault(function (err, authClient) {
  if (err) {
    throw err;
  }

  if (authClient.createScopedRequired && authClient.createScopedRequired()) {
    authClient = authClient.createScoped([
      'https://www.googleapis.com/auth/calendar.readonly'
    ]);
    google.options({
      auth: authClient
    });
  }

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
          calendarId: req.query.calendarId,
          timeMin: req.query.time,
          maxResults: req.query.limit || 10,
      }, function (err, result) {
          res.json(result);
      });
  });

});