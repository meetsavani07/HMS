import React, { useState } from 'react';
import type { Appointment } from '../../types/appointment';
import { useAvailableSlots } from '../../hooks/useAvailableSlots';
import { isTimeSlotAvailable } from '../../utils/appointmentValidation';
import AppointmentFormFields from './AppointmentFormFields';
import DiseaseFields from './DiseaseFields';
import AppointmentFormActions from './AppointmentFormActions';

interface AppointmentFormProps {
  doctors: Array<{ id: string; name: string; specialization: string }>;
  onSubmit: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  onCancel: () => void;
  initialData?: Appointment;
  mode?: 'create' | 'edit' | 'reschedule';
  existingAppointments: Appointment[];
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
  onSubmit,
  onCancel,
  initialData,
  mode = 'create',
  existingAppointments,
}) => {
  const [formData, setFormData] = useState({
    patientName: initialData?.patientName || '',
    doctorId: initialData?.doctorId || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    duration: initialData?.duration || 30,
    disease: initialData?.disease || '',
    severity: initialData?.severity || '',
    symptoms: initialData?.symptoms || [],
    symptomsDescription: initialData?.symptomsDescription || '',
    notes: initialData?.notes || '',
  });

  const [error, setError] = useState<string | null>(null);

  const { availableSlots, isLoading: isLoadingSlots } = useAvailableSlots(
    formData.doctorId,
    formData.date,
    mode === 'edit' ? initialData?.time : undefined
  );

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateTimeSlot = () => {
    if (!formData.doctorId || !formData.date || !formData.time) {
      return false;
    }

    const isAvailable = isTimeSlotAvailable(
      formData.doctorId,
      formData.date,
      formData.time,
      existingAppointments,
      initialData?.id
    );

    if (!isAvailable) {
      setError('This time slot is already booked. Please select another time.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTimeSlot()) {
      return;
    }

    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);
    if (!selectedDoctor) return;

    onSubmit({
      ...formData,
      doctorName: selectedDoctor.name,
      patientId: initialData?.patientId || 'temp-id',
      age: 0,
      contact: '',
      address: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AppointmentFormFields
        formData={formData}
        doctors={doctors}
        availableSlots={availableSlots}
        isLoadingSlots={isLoadingSlots}
        error={error}
        onChange={handleChange}
      />
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
        <DiseaseFields
          disease={formData.disease}
          severity={formData.severity}
          symptoms={formData.symptoms}
          symptomsDescription={formData.symptomsDescription}
          onChange={handleChange}
        />
      </div>

      <AppointmentFormActions mode={mode} onCancel={onCancel} />
    </form>
  );
};

export default AppointmentForm;