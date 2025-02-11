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
    id: 'd2',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    specialization: 'Neurology',
    qualification: 'MD, DM Neurology',
    experience: 12,
    contact: '(555) 234-5678',
    email: 'sarah.johnson@hospital.com',
    schedule: {
      days: ['Tuesday', 'Thursday', 'Saturday'],
      startTime: '10:00',
      endTime: '18:00',
    },
    isAvailable: true,
  },
  {
    id: 'n1',
    name: 'Emily Davis',
    role: 'nurse',
    specialization: 'Critical Care',
    qualification: 'BSN, RN',
    experience: 8,
    contact: '(555) 987-6543',
    email: 'emily.davis@hospital.com',
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '08:00',
      endTime: '16:00',
    },
    isAvailable: true,
  },
  {
    id: 'n2',
    name: 'Michael Wilson',
    role: 'nurse',
    specialization: 'Emergency Care',
    qualification: 'BSN, RN',
    experience: 5,
    contact: '(555) 345-6789',
    email: 'michael.wilson@hospital.com',
    schedule: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      startTime: '12:00',
      endTime: '20:00',
    },
    isAvailable: true,
  }
];