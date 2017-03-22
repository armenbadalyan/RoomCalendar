import { protractor, browser } from 'protractor';
import * as request from 'then-request';

export class MockingRequests {
  public setScenario(name: String, scenario: String) {
    
    return this.sendRequest("PUT", browser.baseUrl + "/ngapimock/mocks", {
        headers: {
            "Content-Type": 'application/json'
        },
        json: {
            identifier: name,
            scenario: scenario
        }
    });
  }

  public sendRequest(httpMethod: String, url: String, opts: Object) {
    const promise = protractor.promise.defer();

    request(httpMethod, url, opts).then((response) => {
      promise.fulfill(response);
    });
    
    return promise; 
  }
}

