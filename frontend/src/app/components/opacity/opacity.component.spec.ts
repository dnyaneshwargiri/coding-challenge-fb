/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OpacityComponent } from './opacity.component';

describe('OpacityComponent', () => {
  let component: OpacityComponent;
  let fixture: ComponentFixture<OpacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
