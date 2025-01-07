import type { Staff } from '../types/staff';

export const mockStaff: Staff[] = [
  {
    id: 'd1',
    name: 'Dr. John Smith',
    role: 'doctor',
    specialization: 'Cardiology',
    qualification: 'MD, DM Cardiology',
    experience: 15,
    contact: '(555) 123-4567',
    email: 'john.smith@hospital.com',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '09:00',
      endTime: '17:00',
    },
    isAvailable: true,
  },
  {
    id: 'n1',
    name: 'Sarah Johnson',
    role: 'nurse',
    specialization: 'Critical Care',
    qualification: 'BSN, RN',
    experience: 8,
    contact: '(555) 987-6543',
    email: 'sarah.johnson@hospital.com',
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '08:00',
      endTime: '16:00',
    },
    isAvailable: true,
  },
];