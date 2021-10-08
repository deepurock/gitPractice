import { TestBed } from '@angular/core/testing';

import { GetAllListService } from './get-all-list.service';

describe('GetAllListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllListService = TestBed.get(GetAllListService);
    expect(service).toBeTruthy();
  });
});
