/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoRoomComponent } from './no-room.component';

describe('NoRoomComponent', () => {
  let component: NoRoomComponent;
  let fixture: ComponentFixture<NoRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
