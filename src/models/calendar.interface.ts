import { DoctorOnDuty, Duty } from "./duty.interface";

export interface Month {

}


export interface WorkDay {
    dayNumber: number;
    dayType: 'Monday'| 'Tuesday'| 'Wendesday'|  'Thursday' | 'Friday';
    doctorDuties: DoctorOnDuty[];
}

export interface Weekend {
    dayNumber: number;
    dayType: 'Saturday' | 'Sunday';
    doctorDuties: DoctorOnDuty[];
}

export interface Holiday {
    dayType: string;
    dayNumber: number;
    doctorDuties: DoctorOnDuty[];
}

