import { TestBed } from '@angular/core/testing';

import { MyNgImgMagnifierService } from './my-ng-img-magnifier.service';
import { Injectable } from '@angular/core';

describe('MyNgImgMagnifierService', () => {
  let service: MyNgImgMagnifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(MyNgImgMagnifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
