import { TestBed } from '@angular/core/testing';

import { NgWebworkerHelperService } from './ng-webworker-helper.service';

describe('NgWebworkerHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgWebworkerHelperService = TestBed.get(NgWebworkerHelperService);
    expect(service).toBeTruthy();
  });
});
