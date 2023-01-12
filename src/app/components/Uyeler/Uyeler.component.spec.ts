/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UyelerComponent } from './Uyeler.component';

describe('UyelerComponent', () => {
  let component: UyelerComponent;
  let fixture: ComponentFixture<UyelerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UyelerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UyelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
