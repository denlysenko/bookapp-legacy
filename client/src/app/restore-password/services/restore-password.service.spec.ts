import { TestBed, inject } from '@angular/core/testing';

import { RestorePasswordService } from './restore-password.service';

describe('RestorePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestorePasswordService]
    });
  });

  it('should be created', inject([RestorePasswordService], (service: RestorePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
