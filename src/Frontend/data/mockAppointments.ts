import type { Appointment } from '../types/appointment';

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    patientName: 'John Doe',
    doctorName: 'Dr. John Smith',
    date: '2024-03-20',
    time: '09:00',
    duration: 30,
    status: 'scheduled',
    age: 45,
    contact: '(555) 123-4567',
    address: '123 Main St, City, State',
    disease: 'Hypertension',
    severity: 'Moderate',
    symptoms: ['Headache', 'Dizziness'],
    symptomsDescription: 'Regular checkup for blood pressure monitoring'
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: 'd2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-03-20',
    time: '10:00',
    duration: 30,
    status: 'completed',
    age: 32,
    contact: '(555) 987-6543',
    address: '456 Oak Ave, City, State',
    disease: 'Pneumonia',
    severity: 'Severe',
    symptoms: ['Fever', 'Cough', 'Shortness of Breath'],
    symptomsDescription: 'Follow-up appointment for pneumonia treatment'
  },
  {
    id: 'a3',
    patientId: 'p3',
    doctorId: 'd3',
    patientName: 'Michael Brown',
    doctorName: 'Dr. Michael Chen',
    date: '2024-03-21',
    time: '11:00',
    duration: 30,
    status: 'scheduled',
    age: 28,
    contact: '(555) 456-7890',
    address: '789 Pine St, City, State',
    disease: 'Diabetes',
    severity: 'Moderate',
    symptoms: ['Fatigue', 'Excessive Thirst'],
    symptomsDescription: 'Initial consultation for diabetes management'
  }
];