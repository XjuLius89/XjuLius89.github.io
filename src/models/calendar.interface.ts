import { DoctorOnDuty, Duty } from "./duty.interface";

export interface WorkDay {
    dayNumber: number;
    dayName: string;
    isNonBusinessDay: boolean; // for Weekend and Holiday
    doctorDuties: DoctorOnDuty[];
}

