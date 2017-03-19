/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MediInputComponent } from './medi-input.component';

describe('MediInputComponent', () => {
  let component: MediInputComponent;
  let fixture: ComponentFixture<MediInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
