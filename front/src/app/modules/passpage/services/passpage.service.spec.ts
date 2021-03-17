import { TestBed } from '@angular/core/testing';

import { PasspageService } from './passpage.service';

describe('PasspageService', () => {
  let service: PasspageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasspageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
