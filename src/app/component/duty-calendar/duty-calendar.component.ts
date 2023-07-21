import { Component, OnInit } from '@angular/core';
import { DayValidatorService } from 'src/app/service/day-validator.service';
import { WorkDay } from 'src/models/calendar.interface';
import { DutyType } from 'src/models/duty-type.constant';
import { RotateType } from 'src/models/rotate-type.constant';

@Component({
  selector: 'app-duty-calendar',
  templateUrl: './duty-calendar.component.html',
  styleUrls: ['./duty-calendar.component.scss']
})
export class DutyCalendarComponent implements OnInit {

  public testWorkDay!: WorkDay;

  constructor(
    private dayValidatorService: DayValidatorService,
  ) {

  }

  ngOnInit(): void {

    this.testWorkDay = {
      dayNumber: 1,
      dayType: 'Wendesday',
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
        }
      ]
    }
  }

  getTestWorkDay(): string {
    return JSON.stringify(this.testWorkDay, null, 2);
  }

}
