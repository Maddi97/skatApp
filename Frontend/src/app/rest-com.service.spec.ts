import { TestBed } from '@angular/core/testing';

import { RestComService } from './rest-com.service';

describe('RestComService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestComService = TestBed.get(RestComService);
    expect(service).toBeTruthy();
  });
});
