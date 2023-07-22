import { TestBed } from '@angular/core/testing';

import { DoctorAssignerService } from './doctor-assigner.service';

describe('DoctorAssignerService', () => {
  let service: DoctorAssignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorAssignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
