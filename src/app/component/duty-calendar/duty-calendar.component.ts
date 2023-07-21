import { Component, OnInit } from '@angular/core';
import { DayValidatorService } from 'src/app/service/day-validator.service';
import { WorkDay } from 'src/model/calendar.interface';
import { DutyType } from 'src/model/duty.constant';
import { Rotate } from 'src/model/rotate.constant';

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
        }
      ]
    }
  }

  getTestWorkDay(): string {
    return JSON.stringify(this.testWorkDay, null, 2);
  }

}
