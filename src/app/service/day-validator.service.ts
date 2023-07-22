import { Injectable } from '@angular/core';
import { WorkDay } from 'src/models/calendar.interface';
import { LoggingService } from './common/logger.service';


@Injectable({
  providedIn: 'root'
})
export class DayValidatorService {
  readonly className = `DayValidatorService`;

  constructor(
    private logger: LoggingService,
  ) { }

  isValidWorkDay(day: WorkDay): boolean {
    let isValid = true;
    let dutyCount = 0;
    const checkDutyType = new Map<string, string>();
    const checkRotateType = new Map<string, string>();

    day.doctorDuties.forEach(_duty => {
      if (checkDutyType.get(_duty.dutyType)) {
        isValid = false;
        this.logger.error(`found duplicate duty type | type: ${_duty.dutyType} name: ${_duty.doctorName}`, this);
      } else {
        checkDutyType.set(_duty.dutyType, _duty.doctorName);
      }

      if (checkRotateType.get(_duty.rotate)) {
        isValid = false;
        this.logger.error(`found duplicate rotate type | rotate: ${_duty.rotate} name: ${_duty.doctorName}`, this);
      } else {
        checkRotateType.set(_duty.rotate, _duty.doctorName);
      }
      dutyCount += 1;
    });

    if (dutyCount !== 6) {
      isValid = false;
      this.logger.error(`workday has duty less then 6 duty doctors.`, this);
    }
    // rotate dup check
    return isValid;
  }
}
