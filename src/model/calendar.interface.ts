export interface Month {

}


export interface WorkDay {
    dayNumber: number;
    dayType: 'Monday'| 'Tuesday'| 'Wendesday'|  'Thursday' | 'Friday';
    duty: Duty[];
}

export interface Weekend {
    dayNumber: number;
    dayType: 'Saturday' | 'Sunday';
    duty: Duty[];
}

export interface Holiday {
    dayType: string;
    dayNumber: number;
    duty: Duty[];
}

export interface Duty {
    doctorName: string;
    dutyType: string;
    rotate: string;
}
