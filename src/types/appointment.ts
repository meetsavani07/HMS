export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  age: number;
  contact: string;
  address: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  disease: string;
  severity: string;
  symptoms: string[];
  symptomsDescription: string;
}