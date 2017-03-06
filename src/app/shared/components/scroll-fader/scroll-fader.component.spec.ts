/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, ViewChild } from '@angular/core';

import { ScrollFaderComponent } from './scroll-fader.component';
import { ScrollDelegateService } from '../../services';

@Component({
  template: `<div  [ngStyle]="currentStyles"><scroll-fader><span>{{content}}</span></scroll-fader></div>`
})
class TestHostComponent {
  @ViewChild(ScrollFaderComponent)
  scrollComponent: ScrollFaderComponent;
  content: string;
  currentStyles: any = {
    'width': '100px',
    'height': '0.5em',
    'position': 'relative'
  };
}

describe('CustomScrollComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let scrollDelegateService: ScrollDelegateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, ScrollFaderComponent],
      providers: [
        ScrollDelegateService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    scrollDelegateService = TestBed.get(ScrollDelegateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have fades when empty', () => {
    expect(component.scrollComponent.isTopped).toBeTruthy();
    expect(component.scrollComponent.isBottomed).toBeTruthy();
  });

  it('should have bottom fade when non empty', async(() => {
    component.content = 'Test';
    fixture.detectChanges();
    scrollDelegateService.refresh();
    scrollDelegateService.updater.subscribe(success => {
      expect(component.scrollComponent.isTopped).toBeTruthy();
      expect(component.scrollComponent.isBottomed).toBeFalsy();
    });
  }));

});
