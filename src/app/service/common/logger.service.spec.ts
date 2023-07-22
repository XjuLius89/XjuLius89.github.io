import { TestBed } from '@angular/core/testing';

import { LoggingService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
