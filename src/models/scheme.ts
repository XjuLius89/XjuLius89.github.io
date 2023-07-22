import { DutyType } from "./duty-type.constant";
import { DoctorOnDuty } from "./duty.interface";

export class Scheme {
    /*
        วันธรรมดา •1351 •1352.1 •1352.2 •เสริม R1.1 •เสริม R1.2 •เสริม R1.3
    */
    normal: DoctorOnDuty[] = [
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1351 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_1 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_2 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_1 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_2 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_3 },
    ];

    /*
        วันหยุด(เสาร-อาทิตย หยุดยาว) •1351 •1352.1 •1352.2 •เสริม R1.1
    */
    weekend: DoctorOnDuty[] = [
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1351 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_1 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_2 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_1 },
    ];
}

