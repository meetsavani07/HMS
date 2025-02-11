import type { Patient } from '../types/patient';

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 45,
    gender: 'male',
    contact: '(555) 123-4567',
    condition: 'Stable',
    admissionDate: '2024-03-15',
    doctorId: 'd1',
    doctorName: 'Dr. John Smith',
    disease: 'Hypertension',
    severity: 'Moderate',
    symptoms: ['Headache', 'Dizziness'],
    symptomsDescription: 'Frequent headaches and occasional dizziness',
    bloodGroup: 'A+',
    allergies: ['Penicillin'],
    medications: ['Lisinopril', 'Aspirin']
  },
  {
    id: 'p2',
    name: 'Jane Smith',
    age: 32,
    gender: 'female',
    contact: '(555) 987-6543',
    condition: 'Critical',
    admissionDate: '2024-03-14',
    doctorId: 'd2',
    doctorName: 'Dr. Sarah Johnson',
    disease: 'Pneumonia',
    severity: 'Severe',
    symptoms: ['Fever', 'Cough', 'Shortness of Breath'],
    symptomsDescription: 'High fever with severe coughing and difficulty breathing',
    bloodGroup: 'O+',
    allergies: [],
    medications: ['Azithromycin', 'Paracetamol']
  },
  {
    id: 'p3',
    name: 'Michael Brown',
    age: 28,
    gender: 'male',
    contact: '(555) 456-7890',
    condition: 'Fair',
    admissionDate: '2024-03-16',
    doctorId: 'd3',
    doctorName: 'Dr. Michael Chen',
    disease: 'Diabetes',
    severity: 'Moderate',
    symptoms: ['Fatigue', 'Excessive Thirst'],
    symptomsDescription: 'Recently diagnosed Type 2 Diabetes',
    bloodGroup: 'B+',
    allergies: ['Sulfa Drugs'],
    medications: ['Metformin']
  }
];