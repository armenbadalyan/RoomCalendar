import { async, inject, TestBed } from '@angular/core/testing';

import { PageService } from './page.service';
import { Page } from '../models';

class FakePage {

};

describe('PageService', () => {
  let pageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PageService,
        {
          provide: Page,
          useClass: FakePage
        }
      ]
    });
  });

  beforeEach(inject([PageService], (service) => {
      pageService = service;
  }));

  it('should construct', () => {
      expect(pageService).toBeDefined();
  });

  it ('should have notify page init method', () => {
    expect(typeof pageService.notifyPageInit).toBe('function');
  });

});
