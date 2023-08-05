/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RadioInputComponent } from './radioInput.component';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
