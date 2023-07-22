import { Injectable } from '@angular/core';
import { RotateData } from './../../models/rotate-data.interface';
import { LoggingService } from './common/logger.service';

class AssignedList {
  rotate!: string;
  date!: string;
  type!: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorAssignerService {
  readonly className = `DoctorAssignerService`;

  public doctorList: RotateData[] = [];
  public doctorAssignedList: Map<string, AssignedList[]> = new Map();

  public listSize = 0;
  public currentIndex = 0;


  constructor(
    private logger: LoggingService,
  ) { }

  setDoctorList(list: RotateData[]): void {
    this.doctorList = list;
    this.listSize = this.doctorList.length;
  }

  next(skipList: string[]): RotateData {
    this.logger.info(`finding.. doctor...`, this);

    const copyDoctorList: RotateData[] = JSON.parse(JSON.stringify(this.doctorList));

    this.logger.warn(`skipList: ${skipList}`, this);

    // remove skip name from the list
    for (let i = 0; i < skipList.length; i++) {
      const index = copyDoctorList.findIndex(e => e.doctorName === skipList[i]);
      if (index > -1) {
        this.logger.warn(`remove ${copyDoctorList[index].doctorName} off the list.`, this);
        copyDoctorList.splice(index, 1);
      }
    }

    // find max
    let currentMaxAssignedDutyCount = 0;
    this.doctorAssignedList.forEach(doctor => {
      if (doctor.length > currentMaxAssignedDutyCount) {
        currentMaxAssignedDutyCount = doctor.length;
      }
    });
    this.logger.info(`current max assigned duty count = ${currentMaxAssignedDutyCount}`, this);

    let foundIndex = 0;

    for (let i = 0; i < copyDoctorList.length; i++) {

      let dutyCount = this.doctorAssignedList.get(copyDoctorList[i]?.doctorName)?.length;

      if (!dutyCount) {
        dutyCount = 0;
        foundIndex = i;
        this.logger.info(`found doctor to assign ${JSON.stringify(copyDoctorList[foundIndex])} current duty count: ${dutyCount}`, this);
        break;
      }

      if (dutyCount < currentMaxAssignedDutyCount) {
        foundIndex = i;
        this.logger.info(`found doctor to assign ${JSON.stringify(copyDoctorList[foundIndex])} current duty count: ${dutyCount}`, this);
        break;
      }
    }

    if (copyDoctorList[foundIndex] === undefined) {
      this.logger.error(`No doctor left to assign.`, this);
      return copyDoctorList[foundIndex];
    }

    return copyDoctorList[foundIndex];
  }

  setAssignDuty(doctorName: string, rotate: string, type: string, date: string): void {
    const assigned = {
      date: date,
      rotate: rotate,
      type: type,
    } as AssignedList;

    if (this.doctorAssignedList.has(doctorName)) {
      this.doctorAssignedList.get(doctorName)?.push(assigned);
    } else {
      this.doctorAssignedList.set(doctorName, [assigned]);
    }

  }

  report(): void {
    this.doctorAssignedList.forEach((key, value) => {
      this.logger.info(`key: ${JSON.stringify(value)} value: ${JSON.stringify(key.length)} `, this);
    });

  }
}
