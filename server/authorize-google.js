var path = require('path');
var google = require('googleapis');
var Promise = require('promise');

var authPromise = new Promise(function(resolve, reject){

 var fileName = process.env.GOOGLE_APPLICATION_CREDENTIALS || null,
     file = fileName ? require(path.resolve(fileName)) : null;

  var jwtClient = new google.auth.JWT(
    file.client_email || process.env.client_email || "",
    null,
    (file.private_key || process.env.private_key || "").replace(/\\n/g, '\n'),
    [ 'https://www.googleapis.com/auth/calendar.readonly' ],
    file.impersonate_email || process.env.impersonate_email  || null
  );

  jwtClient.authorize( function( err, tokens ) {
    if ( err ) {
      reject(err);
    }

    google.options({
        auth: jwtClient
    });

    resolve();
  });
  
});

module.exports = authPromise;