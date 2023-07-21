import { Injectable } from '@angular/core';
import { WorkDay } from 'src/models/calendar.interface';
import { RotateList } from 'src/models/rotate-data.interface';

@Injectable({
  providedIn: 'root'
})
export class RotateUtilsService {

  constructor() { }

  read(list: RotateList): WorkDay[] {
    const result: WorkDay[] = [];

    const daysCount = this.getMonthDaysCount(list.year + '-' + list.month);

    for (let i = 1; i <= daysCount; i++) {
      var d = new Date(list.year + '/' + list.month + '/' + i);
      var dayName = d.toString().split(' ')[0];
      const workDay: WorkDay = {
        dayNumber: i,
        dayType: dayName,
        isNonBusinessDay: false,
        doctorDuties: []
      };
      result.push(workDay);
    }
    return result;
  }

  getMonthDaysCount(date: string | Date): number {
    const tmp = new Date(date);
    tmp.setMonth(tmp.getMonth() + 1);
    tmp.setDate(0);
    return tmp.getDate();
  };

}
