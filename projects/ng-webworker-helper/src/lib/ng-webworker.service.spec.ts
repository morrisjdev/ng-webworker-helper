import { TestBed } from '@angular/core/testing';

import { NgWebworkerService } from './ng-webworker.service';

describe('NgWebworkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgWebworkerService = TestBed.get(NgWebworkerService);
    expect(service).toBeTruthy();
  });
});
