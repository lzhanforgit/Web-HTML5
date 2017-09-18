import { TestBed, inject } from '@angular/core/testing';

import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserServiceService]
    });
  });

  it('should be created', inject([UserServiceService], (service: UserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
