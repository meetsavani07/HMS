import type { Appointment } from '../types/appointment';

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    patientName: 'Alice Brown',
    doctorName: 'Dr. John Smith',
    date: '2024-03-20',
    time: '09:00',
    duration: 30,
    status: 'scheduled',
    age: 35,
    contact: '(555) 123-4567',
    address: '123 Main St, City, State',
    disease: 'Common Cold',
    severity: 'Mild',
    symptoms: ['Fever', 'Cough'],
    symptomsDescription: 'Mild fever and persistent cough'
  }
];