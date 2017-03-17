require('dotenv').config();
var express    = require('express');
var app        = express();
var google = require('googleapis');
var port = process.env.PORT || 8080;
var AuthorizeGoogle = require('./authorize-google.js');

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

app.use('/api', function(req, res, next) {
  AuthorizeGoogle().then(function() {
    next();
  }, function() {
    res.sendStatus(401);
  });
});

app.listen(port);

var calendar = google.calendar('v3');

app.get('/api/calendars', function (req, res) {
  calendar.calendarList.list({}, function (err, result) {
    res.json(result.items || []);
  });
});

app.get('/api/events', function (req, res) {
  calendar.events.list({
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
      calendarId: req.query.calendarId,
      timeMin: req.query.time,
      maxResults: req.query.limit || 10,
  }, function (err, result) {
      res.json(result.items || []);
  });
});