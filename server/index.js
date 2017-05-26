require('dotenv').config();

var express = require('express');
var app = express();
var google = require('googleapis');
var calendar = google.calendar('v3');
var port = process.env.PORT || 8080;
var authorizeGoogle = require('./authorize-google.js');
var winston = require('winston');
require('winston-daily-rotate-file')

winston.configure({
    transports: [
        new winston.transports.DailyRotateFile({ 
          json: false,
          datePattern: '.yyyy-MM-dd',
          filename: 'roomcalendar.log',
          maxsize: 104857600,
          maxFiles: 1
        })
    ]
});

app.listen(port);

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
  var ip = req.headers['x-forwarded-for'] ||
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           req.connection.socket.remoteAddress;
  winston.info('index.js | /api | new request from ip ' + ip);
  authorizeGoogle.checkAuth().then(function() {
    next();
  }, function() {
    res.sendStatus(401);
  });
});

app.get('/api/calendars', function (req, res) {
  winston.info('index.js | /api/calendars | request calendars');
  loadCalendars()
    .then(function(items) {
      res.json(items);
    })
    .catch(function(err) {
      handleError(err);
      res.sendStatus(400); 
    });
});

app.get('/api/events', function (req, res) {
  winston.info('index.js | /api/calendars | request events');
  var query = req.query;

  if(typeof query.calendarId == 'undefined' || typeof query.time == "undefined" || typeof query.limit == 'undefined') {
    console.log('undefined parametrs');
    res.sendStatus(400);
    return;
  }

  loadEvents(query.calendarId, query.limit, query.time)
    .then(function(items) {
      res.json(items);
    })
    .catch(function(err) {
      handleError(err);
      res.sendStatus(400); 
    });
});

app.get('/api/insert', function (req, res) {
  var query = req.query;

  if(typeof query.creator == 'undefined' || typeof query.calendarId == 'undefined') {
    res.sendStatus(400);
    return;
  }

  authorizeGoogle.authPromise({
      impersonate_email: query.creator
    }).then(function(jwtClient) {
      calendar.events.insert({
        'auth': jwtClient, 
        'calendarId': query.calendarId,
        'resource': {
          'summary': query.title || 'No Name',
          'description': query.description || '',
          'start': {
            'dateTime':  query.startTime
          },
          'end': {
            'dateTime':  query.endTime
          },
          'reminders': {
            'useDefault': true
          }
        }
      }, function(err, result) {
        if(err) {
          res.json({
            success: false,
            error: err
          });
        } else {
            res.json({
              success: true,
              event: result
            });
        }
      });
  });
});

function handleError(err) {
  if(err.code === 401) {
    authorizeGoogle.resetToken();
    console.log('err during request');
    console.log(err);
    winston.error('index.js | handleError | ' + err);
  }
}

function loadCalendars() {
  return new Promise(function(resolve, reject) {
    calendar.calendarList.list({
      auth: null
    }, function (err, result) {
      if(!result || typeof result.items == 'undefined') {
        reject(err);
      } else {
        resolve(result.items || []);
      }
    });
  });
}

function loadEvents(calendarId, limit, time) {
  return new Promise(function(resolve, reject) {
    calendar.events.list({
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        calendarId: calendarId,
        timeMin: time,
        maxResults: limit || 10,
    }, function (err, result) {
        if(!result || typeof result.items == 'undefined') {
          reject(err);
        } else {
          resolve(result.items || []);
        }
    });
  });
}