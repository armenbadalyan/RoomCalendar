var path = require('path');
var google = require('googleapis');
var Promise = require('promise');

var appJwt = null;

function getDataSource() {
    var fileName = process.env.GOOGLE_APPLICATION_CREDENTIALS || null,
        file = fileName ? require(path.resolve(fileName)) : null;
    return file || process.env;
}

function createJwtClient(client_email, private_key, scopes, impersonate_email) {
    return new google.auth.JWT(
        client_email,
        null,
        private_key, 
        scopes,
        impersonate_email
    );
}

function checkTokenValid() {
    if(appJwt === null || !appJwt.gtoken) {
        return false;
    }

    var tokenDate = new Date(appJwt.gtoken.expires_at),
        curDate = new Date();

    return tokenDate > curDate;
}

function resetToken() {
    appJwt == null;
}

function authPromise(options) {
    return new Promise(function (resolve, reject) {

        var source = getDataSource();

        var client_email = options.client_email || source.client_email || "",
            private_key = (options.private_key || source.private_key || "").replace(/\\n/g, '\n'),
            impresonate_email = options.impersonate_email || source.impersonate_email || "",
            scopes = [ options.scope || source.scope ];

        var jwtClient = createJwtClient(client_email, private_key, scopes, impresonate_email);

        jwtClient.authorize(function (err, tokens) {
            err ? reject(err) : resolve(jwtClient);
        });

    });
}

function checkAuth(options, forceUpdate) {
    forceUpdate = forceUpdate || false;
    options = options || {};

    if(!forceUpdate && checkTokenValid()) {
        return Promise.resolve(appJwt);
    }
    
    return new Promise(function (resolve, reject) {
        authPromise(options)
            .then(function(jwtClient) {
                appJwt = jwtClient;
                google.options({
                    auth: jwtClient
                });
                resolve(appJwt);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

module.exports = {
    checkAuth: checkAuth,
    authPromise: authPromise,
    resetToken: resetToken
};