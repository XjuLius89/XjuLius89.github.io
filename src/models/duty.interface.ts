export interface Duty {
    doctorName: string;
    rotate: string;
}

export interface DoctorOnDuty extends Duty {
    dutyType: string; // 1351, 1352.1
}