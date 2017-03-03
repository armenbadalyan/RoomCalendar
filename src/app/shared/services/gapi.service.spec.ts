import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { GapiService } from './gapi.service';
import { environment } from '../../../environments/environment';


describe ('ScrollDelegateService', () => {
  let gapiService;

  beforeEach(() => {
    gapiService = new GapiService();
  });

  it('should construct', () => {
    expect(gapiService).toBeDefined();
  });
});
