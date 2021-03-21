import { TestBed } from '@angular/core/testing';

import { RoleDoctorGuard } from './role-doctor.guard';

describe('RoleDoctorGuard', () => {
  let guard: RoleDoctorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleDoctorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
