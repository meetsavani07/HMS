export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  condition: string;
  admissionDate: string;
  doctorId: string;
  doctorName: string;
}