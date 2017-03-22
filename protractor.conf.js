// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
    
    const environment = require('./src/environments/environment.e2e.ts').environment;
    const express = require('express');
    const ngApimock = require('ng-apimock')();
    const mockRequest = require('ng-apimock/lib/utils').ngApimockRequest;
    const app = express();
    const port = environment.PORT;

    ngApimock.run({
      "src": "./mocks/src/", 
      "outputDir": "./mocks/dist", 
      "done": function() { 
      }
    });
    
    app.use(mockRequest);
    app.use('/mocking', express.static('./mocks/dist/')); 
    app.set('port', port);
    app.listen(port, function() {
      console.log('app running on port', app.get('port'));
    });
  }
};
