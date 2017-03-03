var path = require('path');
var google = require('googleapis');
var Promise = require('promise');

var authPromise = function () {
    return new Promise(function (resolve, reject) {

        var fileName = process.env.GOOGLE_APPLICATION_CREDENTIALS || null,
            file = fileName ? require(path.resolve(fileName)) : null,
            client_email = file ? file.client_email : process.env.client_email,
            private_key = file ? file.private_key : process.env.private_key,
            impresonate_email = file ? file.impersonate_email : process.env.impersonate_email;

        console.log('client_email: ' + client_email);
        console.log('private_key: ' + private_key);
        console.log('impresonate_email: ' + impresonate_email);

        var jwtClient = new google.auth.JWT(
            client_email || "",
            null,
            (private_key || "").replace(/\\n/g, '\n'), ['https://www.googleapis.com/auth/calendar'],
            impresonate_email  || null
        );

        jwtClient.authorize(function (err, tokens) {
            if (err) {
                console.log(err);
                reject(err);
            }

            google.options({
                auth: jwtClient
            });

            resolve();
        });

    });
};

module.exports = authPromise;