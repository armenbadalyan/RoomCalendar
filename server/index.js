require('dotenv').config();

var express = require('express');
var app = express();
var google = require('googleapis');
var calendar = google.calendar('v3');
var port = process.env.PORT || 8080;
var authorizeGoogle = require('./authorize-google.js');

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
  authorizeGoogle.checkAuth().then(function() {
    next();
  }, function() {
    res.sendStatus(401);
  });
});

app.get('/api/calendars', function (req, res) {
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
  var query = req.query;

  if(typeof query.calendarId == 'undefined' || typeof query.time == "undefined" || typeof query.limit == 'undefined') {
    console.log('undefined parametrs');
    res.sendStatus(400);
    return;
  }

  loadEvents(query.calendarId, query.limit)
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

function loadEvents(calendarId, limit) {
  return new Promise(function(resolve, reject) {
    calendar.events.list({
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        calendarId: query.calendarId,
        timeMin: query.time,
        maxResults: query.limit || 10,
    }, function (err, result) {
        if(!result || typeof result.items == 'undefined') {
          reject(err);
        } else {
          resolve(result.items || []);
        }
    });
  });
}