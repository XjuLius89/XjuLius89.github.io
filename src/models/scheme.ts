import { DutyType } from "./duty-type.constant";
import { DoctorOnDuty } from "./duty.interface";

export class Scheme {
    normal: DoctorOnDuty[] = [
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1351 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_1 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_2 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_1 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_2 },
        { doctorName: '', rotate: '', dutyType: DutyType.sDuty_r1_3 },
    ];

    weekend: DoctorOnDuty[] = [
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1351 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_1 },
        { doctorName: '', rotate: '', dutyType: DutyType.duty_1352_2 },
    ];
}

