/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HaberlerComponent } from './Haberler.component';

describe('HaberlerComponent', () => {
  let component: HaberlerComponent;
  let fixture: ComponentFixture<HaberlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaberlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaberlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
