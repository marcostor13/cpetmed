import { TestBed } from '@angular/core/testing';

import { RolePatientGuard } from './role-patient.guard';

describe('RolePatientGuard', () => {
  let guard: RolePatientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolePatientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
