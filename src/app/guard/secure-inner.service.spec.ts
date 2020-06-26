import { TestBed } from '@angular/core/testing';

import { SecureInnerService } from './secure-inner.service';

describe('SecureInnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureInnerService = TestBed.get(SecureInnerService);
    expect(service).toBeTruthy();
  });
});
