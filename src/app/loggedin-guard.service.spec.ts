import { TestBed, inject } from '@angular/core/testing';

import { LoggedinGuard } from './loggedin-guard.service';

describe('LoggedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedinGuard]
    });
  });

  it('should be created', inject([LoggedinGuard], (service: LoggedinGuard) => {
    expect(service).toBeTruthy();
  }));
});
