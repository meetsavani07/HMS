export interface Disease {
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms: string[];
}

export const commonDiseases = [
  'Common Cold',
  'Flu',
  'Hypertension',
  'Diabetes',
  'Asthma',
  'Arthritis',
  'Migraine',
  'Allergies',
  'Other'
] as const;

export const commonSymptoms = [
  'Fever',
  'Cough',
  'Headache',
  'Fatigue',
  'Nausea',
  'Body Ache',
  'Shortness of Breath',
  'Dizziness',
  'Other'
] as const;