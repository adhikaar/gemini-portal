import { TestBed, inject } from '@angular/core/testing';

import { NavigationGuardService } from './navigation-guard.service';

describe('NavigationGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationGuardService]
    });
  });

  it('should be created', inject([NavigationGuardService], (service: NavigationGuardService) => {
    expect(service).toBeTruthy();
  }));
});
