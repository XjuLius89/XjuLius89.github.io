import { Injectable } from '@angular/core';
import { WorkDay } from 'src/models/calendar.interface';
import { DutyType } from 'src/models/duty-type.constant';
import { RotateList } from 'src/models/rotate-data.interface';
import { RotateType } from 'src/models/rotate-type.constant';
import { DutyRowData } from 'src/models/row-data.interface';
import { Scheme } from 'src/models/scheme';
import { LoggingService } from './common/logger.service';
import { DoctorAssignerService } from './doctor-assigner.service';
import { DoctorOnDuty } from 'src/models/duty.interface';

@Injectable({
  providedIn: 'root'
})
export class RotateUtilsService {
  readonly className = `RotateUtilsService`;

  constructor(
    private logger: LoggingService,
    private doctorAssignerService: DoctorAssignerService,
  ) { }

  parse(list: RotateList): WorkDay[] {
    const month = this.getMonthTemplate(list.year, list.month);
    this.logger.info(`year/month (${list.year}/${list.month}) = ${JSON.stringify(month.length, null, 2)}`, this);

    this.doctorAssignerService.setDoctorList(list.rotateList);

    month.forEach(day => {

      this.logger.info(`############ Day: ${day.dayNumber} | ${day.dayName} ############ `, this);

      // Normal day
      if (!day.isWeekend) {
        const normalDay = new Scheme().normal;

        this.coreAssigningProcess(normalDay, day, list);

        day.doctorDuties = [...normalDay];

      } else if (day.isWeekend) {

        const weekendDay = new Scheme().weekend;

        this.coreAssigningProcess(weekendDay, day, list);

        day.doctorDuties = [...weekendDay];
      }
    });

    return month;
  }

  coreAssigningProcess(processDay: DoctorOnDuty[], day: WorkDay, list: RotateList): void {

    processDay.forEach(slot => {

      this.logger.info(`\n========== Assigning Slot: ${slot.dutyType} ==========`, this);


      let skipList: string[] = [];
      let shouldRetry = true;
      let retry = 0;

      do {
        retry++;
        if (retry === list.rotateList.length) {
          shouldRetry = false;
        }
        const doctor = this.doctorAssignerService.next(skipList);

        if (doctor === undefined) {
          this.logger.error(`No Doctor left to assign. Slot ${slot.dutyType} left empty.`, this);
          skipList = [];
          break;
        }

        let doctorRotate = this.isFirstHalf(day) ? doctor?.rotate_1 : doctor?.rotate_2;

        switch (doctorRotate) {
          case RotateType.GEN:
          case RotateType.HN:
          case RotateType.OBG:
          case RotateType.Ortho:
          case RotateType.Neuro:
          case RotateType.Ped:
            // จริง 1 เสริม 1

            if (this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate)) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }

            if (!this.isMainDuty(slot.dutyType) && this.isExistFor(processDay, doctorRotate) && !this.hasTwoRotateAlready(processDay, doctorRotate)) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }

            break;

          case RotateType.Uro:
          case RotateType.Plastic:
          case RotateType.ENT:
          case RotateType.Trauma:
            // จริง or เสริม

            if (this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate)) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }

            if (!this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate)) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }

            break;

          case RotateType.SIPAC:
            // เสริม 1

            if (!this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate)) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }
            break;

          case RotateType.Eye:
            // จริงหรือเสริม ห้ามวันพุธ

            if (this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate) && day.dayName !== 'Wed') {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }

            if (!this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate) && day.dayName !== 'Wed') {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }
            break;

          case RotateType.XRay:
            // จริงหรือเสริม ห้ามวันจันทร์และพุธ

            if ((this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate) && day.dayName !== 'Mon')
              || (this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate) && day.dayName !== 'Wed')
            ) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }

            if ((!this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate) && day.dayName !== 'Mon')
              || (!this.isMainDuty(slot.dutyType) && !this.isExistFor(processDay, doctorRotate) && day.dayName !== 'Wed')
            ) {
              slot.doctorName = doctor.doctorName;
              slot.rotate = doctorRotate;
              this.doctorAssignerService.setAssignDuty(doctor.doctorName, doctorRotate, slot.dutyType, list.month + '/' + day.dayNumber);
            }
            break;

          default:
            break;
        }

        if (slot.doctorName === '') {
          this.logger.warn(`${slot.dutyType} | unable to assign this doctor ${doctor.doctorName}`, this);

          if (skipList.findIndex(e => e === doctor.doctorName) === -1) {
            skipList.push(doctor.doctorName);
          }

          this.logger.warn(`current skip list = ${JSON.stringify(skipList)}`, this);

        } else {
          this.logger.info(`Slot: ${slot.dutyType} ====> Assigned To :${doctor.doctorName}`, this);
        }

      } while (slot.doctorName === '' && shouldRetry);

    });
  }

  isExistFor(list: DoctorOnDuty[], doctorRotate: string): boolean {
    let alreadyExist = false;
    if (list.filter(e => e.rotate === doctorRotate).length) {
      alreadyExist = true;
    }
    return alreadyExist;
  }

  hasTwoRotateAlready(list: DoctorOnDuty[], doctorRotate: string): boolean {
    let result = false;
    if (list.filter(e => e.rotate === doctorRotate).length === 2) {
      result = true;
    }
    return result;
  }

  // Determain if เวรจริง or เวรเสริม
  isMainDuty(dutyType: string): boolean {
    let isMainDuty = true;
    switch (dutyType) {
      case DutyType.sDuty_r1_1:
      case DutyType.sDuty_r1_2:
      case DutyType.sDuty_r1_3:
        isMainDuty = false;
        break;
      default:
        isMainDuty = true;
        break;
    }
    return isMainDuty;
  }

  isFirstHalf(day: WorkDay): boolean {
    return day.dayNumber <= 15;
  }

  getMonthTemplate(year: string, month: string): WorkDay[] {
    const result: WorkDay[] = [];
    const daysCount = this.getMonthDaysCount(year + '-' + month);

    for (let i = 1; i <= daysCount; i++) {
      var d = new Date(year + '/' + month + '/' + i);
      var dayName = d.toString().split(' ')[0];

      const workDay: WorkDay = {
        dayNumber: i,
        dayName: dayName,
        isWeekend: (dayName === 'Sat' || dayName === 'Sun'),
        doctorDuties: []
      };

      result.push(workDay);
    }

    return result;
  }

  transfromWorkDayToRowData(workDayList: WorkDay[]): DutyRowData[] {
    const result: DutyRowData[] = [];

    workDayList.forEach(wDay => {
      const row: DutyRowData = new DutyRowData();

      row.dateNumber = wDay.dayNumber;
      row.dateName = wDay.dayName;

      wDay.doctorDuties.forEach(doctor => {
        switch (doctor.dutyType) {
          case DutyType.duty_1351:
            row.d1351_doctor_name = doctor.doctorName;
            row.d1351_rotate = doctor.rotate;
            break;
          case DutyType.duty_1352_1:
            row.d1352_1_doctor_name = doctor.doctorName;
            row.d1352_1_rotate = doctor.rotate;
            break;
          case DutyType.duty_1352_2:
            row.d1352_2_doctor_name = doctor.doctorName;
            row.d1352_2_rotate = doctor.rotate;
            break;
          case DutyType.sDuty_r1_1:
            row.sDuty_r1_1_doctor_name = doctor.doctorName;
            row.sDuty_r1_1_rotate = doctor.rotate;
            break;
          case DutyType.sDuty_r1_2:
            row.sDuty_r1_2_doctor_name = doctor.doctorName;
            row.sDuty_r1_2_rotate = doctor.rotate;
            break;
          case DutyType.sDuty_r1_3:
            row.sDuty_r1_3_doctor_name = doctor.doctorName;
            row.sDuty_r1_3_rotate = doctor.rotate;
            break;
          case DutyType.pMorning:
            row.pMorning_doctor_name = doctor.doctorName;
            row.pMorning_rotate = doctor.rotate;
            break;
          case DutyType.pAfternoon:
            row.pAfternoon_doctor_name = doctor.doctorName;
            row.pAfternoon_rotate = doctor.rotate;
            break;
          case DutyType.pEvening:
            row.pEvening_doctor_name = doctor.doctorName;
            row.pEvening_rotate = doctor.rotate;
            break;
          case DutyType.pNight:
            row.pNight_doctor_name = doctor.doctorName;
            row.pNight_rotate = doctor.rotate;
            break;
          case DutyType.pNightStar:
            row.pNight_star_doctor_name = doctor.doctorName;
            row.pNight_start_rotate = doctor.rotate;
            break;
          default:
            throw Error('Invalid DutyType!');
        }
      });

      result.push(row);
    });

    return result;
  }

  getMonthDaysCount(date: string | Date): number {
    const tmpDate = new Date(date);
    tmpDate.setMonth(tmpDate.getMonth() + 1);
    tmpDate.setDate(0);
    return tmpDate.getDate();
  };

}
