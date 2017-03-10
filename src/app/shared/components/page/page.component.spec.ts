/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageService } from 'app/shared/services';
import { PageComponent } from './page.component';

describe('ClockComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let PageServiceStub, pageService, pageSpy;

  beforeEach(async(() => {
    PageServiceStub = {
      notifyPageInit: () => {}
    };
    TestBed.configureTestingModule({
      declarations: [ PageComponent ],
      providers:    [
        { provide: PageService, useValue: PageServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    pageService = TestBed.get(PageService);
    pageSpy = spyOn(pageService, 'notifyPageInit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call page init', () => {
    expect(pageSpy).toHaveBeenCalled();
  });
});
