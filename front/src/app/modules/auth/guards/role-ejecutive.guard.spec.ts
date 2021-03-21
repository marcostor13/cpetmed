import { TestBed } from '@angular/core/testing';

import { RoleEjecutiveGuard } from './role-ejecutive.guard';

describe('RoleEjecutiveGuard', () => {
  let guard: RoleEjecutiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleEjecutiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
