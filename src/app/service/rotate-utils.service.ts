import { Injectable } from '@angular/core';
import { WorkDay } from 'src/models/calendar.interface';
import { DutyType } from 'src/models/duty-type.constant';
import { RotateList } from 'src/models/rotate-data.interface';
import { DutyRowData } from 'src/models/row-data.interface';

@Injectable({
  providedIn: 'root'
})
export class RotateUtilsService {

  constructor() { }

  parse(list: RotateList): WorkDay[] {
    const result: WorkDay[] = [];
    const daysCount = this.getMonthDaysCount(list.year + '-' + list.month);

    for (let i = 1; i <= daysCount; i++) {
      var d = new Date(list.year + '/' + list.month + '/' + i);
      var dayName = d.toString().split(' ')[0];

      const workDay: WorkDay = {
        dayNumber: i,
        dayName: dayName,
        isNonBusinessDay: false,
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
