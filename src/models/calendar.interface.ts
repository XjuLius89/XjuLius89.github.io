import { DoctorOnDuty, Duty } from "./duty.interface";

export interface WorkDay {
    dayNumber: number;
    dayType: string;
    isNonBusinessDay: boolean; // for Weekend and Holiday
    doctorDuties: DoctorOnDuty[];
}

