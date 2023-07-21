export interface Duty {
    doctorName: string;
    rotate: string;
}

export interface DoctorOnDuty extends Duty {
    dutyType: string;
}