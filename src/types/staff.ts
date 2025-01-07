export type StaffRole = 'doctor' | 'nurse';

export interface Staff {
  id: string;
  name: string;
  role: StaffRole;
  specialization: string;
  qualification: string;
  experience: number;
  contact: string;
  email: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  isAvailable: boolean;
}