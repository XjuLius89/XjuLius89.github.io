import { DoctorOnDuty, Duty } from "./duty.interface";

export interface WorkDay {
    dayNumber: number;
    dayName: string;
    isWeekend: boolean; // for Weekend and Holiday
    doctorDuties: DoctorOnDuty[];
}

