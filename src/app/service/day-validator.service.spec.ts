import { TestBed } from '@angular/core/testing';

import { DayValidatorService } from './day-validator.service';
import { WorkDay } from 'src/model/calendar.interface';
import { DutyType } from 'src/model/duty.constant';
import { Rotate } from 'src/model/rotate.constant';

describe('DayValidatorService', () => {
  let service: DayValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('test isValidWorkDay', () => {
    const testWorkDay: WorkDay = {
      dayNumber: 1,
      dayType: 'Wendesday',
      duty: [
        {
          doctorName: 'Napat',
          dutyType: DutyType.duty_1351,
          rotate: Rotate.ENT,
        },
        {
          doctorName: 'Rabbit',
          dutyType: DutyType.duty_1352_1,
          rotate: Rotate.Eye
        },
        {
          doctorName: 'Johnson',
          dutyType: DutyType.duty_1352_2,
          rotate: Rotate.Gen
        },
        {
          doctorName: 'Jackson',
          dutyType: DutyType.sDuty_r1_1,
          rotate: Rotate.Plastic
        },
        {
          doctorName: 'Koji',
          dutyType: DutyType.sDuty_r1_2,
          rotate: Rotate.Trauma
        },
        {
          doctorName: 'Six',
          dutyType: DutyType.sDuty_r1_3,
          rotate: Rotate.Neuro
        }
      ]
    }
    expect(service.isValidWorkDay(testWorkDay)).toEqual(true);
  });
});
