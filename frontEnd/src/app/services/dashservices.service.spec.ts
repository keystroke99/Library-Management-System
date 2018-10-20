import { TestBed, inject } from '@angular/core/testing';

import { DashservicesService } from './dashservices.service';

describe('DashservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashservicesService]
    });
  });

  it('should be created', inject([DashservicesService], (service: DashservicesService) => {
    expect(service).toBeTruthy();
  }));
});
