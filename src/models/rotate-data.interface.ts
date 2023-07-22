export interface RotateList {
    month: string;
    year: string;
    rotateList: RotateData[];
}

export interface RotateData {
    doctorName: string;
    rotate_first_half: string;
    rotate_second_half: string;
}
