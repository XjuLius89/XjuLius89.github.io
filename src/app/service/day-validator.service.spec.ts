import { TestBed } from '@angular/core/testing';

import { DayValidatorService } from './day-validator.service';
import { WorkDay } from 'src/models/calendar.interface';
import { DutyType } from 'src/models/duty-type.constant';
import { RotateType } from 'src/models/rotate-type.constant';

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
      dayName: 'Wendesday',
      doctorDuties: [
        {
          doctorName: 'Napat',
          dutyType: DutyType.duty_1351,
          rotate: RotateType.ENT,
        },
        {
          doctorName: 'Rabbit',
          dutyType: DutyType.duty_1352_1,
          rotate: RotateType.Eye
        },
        {
          doctorName: 'Johnson',
          dutyType: DutyType.duty_1352_2,
          rotate: RotateType.Gen
        },
        {
          doctorName: 'Jackson',
          dutyType: DutyType.sDuty_r1_1,
          rotate: RotateType.Plastic
        },
        {
          doctorName: 'Koji',
          dutyType: DutyType.sDuty_r1_2,
          rotate: RotateType.Trauma
        },
        {
          doctorName: 'Six',
          dutyType: DutyType.sDuty_r1_3,
          rotate: RotateType.Neuro
        }
      ],
      isWeekend: false
    }
    expect(service.isValidWorkDay(testWorkDay)).toEqual(true);
  });
});
