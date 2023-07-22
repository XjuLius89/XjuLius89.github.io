import { TestBed } from '@angular/core/testing';

import { RotateUtilsService } from './rotate-utils.service';
import { RotateList } from 'src/models/rotate-data.interface';

describe('RotateUtilsService', () => {
  let service: RotateUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RotateUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test parse correctly', () => {
    const list: RotateList = {
      month: '08',
      year: '2023',
      rotateList: [
        {
          doctorName: "ณภัทรR1",
          rotate_1: "Ortho",
          rotate_2: "H&N"
        },
        {
          doctorName: "วาทินี",
          rotate_1: "H&N",
          rotate_2: "Ortho"
        }
      ]
    };
    const res = service.parse(list);

    // parse 2023-08, expect for 31 days.
    expect(res.length).toEqual(31);
    expect(res[0].dayNumber).toEqual(1);
    expect(res[0].dayName).toEqual('Tue');
  });
});
