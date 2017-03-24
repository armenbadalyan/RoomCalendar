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
    if(!result || typeof result.items == 'undefined') {
      console.log('err during request');
      console.log(err);
      res.sendStatus(400);
      return;
    }
    res.json(result.items || []);
  });
});

app.get('/api/events', function (req, res) {
  var query = req.query;

  if(typeof query.calendarId == 'undefined' || typeof query.time == "undefined" || typeof query.limit == 'undefined') {
    console.log('undefined parametrs');
    res.sendStatus(400);
    return;
  }

  calendar.events.list({
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
      calendarId: query.calendarId,
      timeMin: query.time,
      maxResults: query.limit || 10,
  }, function (err, result) {
      if(!result || typeof result.items == 'undefined') {
        console.log('err during request');
        console.log(err);
        res.sendStatus(400);
        return;
      }

      res.json(result.items || []);
  });
});