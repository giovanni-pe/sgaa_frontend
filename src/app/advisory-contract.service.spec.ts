import { TestBed } from '@angular/core/testing';

import { AdvisoryContractService } from './core/services/advisory-contract.service';

describe('AdvisoryContractService', () => {
  let service: AdvisoryContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisoryContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
