import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullimagePage } from './fullimage.page';

describe('FullimagePage', () => {
  let component: FullimagePage;
  let fixture: ComponentFixture<FullimagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullimagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullimagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
