import React, { useState } from 'react';
import type { Appointment } from '../../../types/appointment'; // Importing the Appointment type for type safety
import { useAvailableSlots } from '../../../hooks/useAvailableSlots'; // Custom hook to fetch available slots
import { isTimeSlotAvailable } from '../../../utils/appointmentValidation'; // Utility function to check time slot availability
import AppointmentFormFields from './AppointmentFormFields'; // Component for appointment fields
import DiseaseFields from './DiseaseFields'; // Component for medical-related fields
import AppointmentFormActions from './AppointmentFormActions'; // Component for form actions (submit/cancel buttons)

// Defining props for the AppointmentForm component
interface AppointmentFormProps {
  doctors: Array<{ id: string; name: string; specialization: string }>; // List of doctors with id, name, and specialization
  onSubmit: (appointment: Omit<Appointment, 'id' | 'status'>) => void; // Function to handle form submission
  onCancel: () => void; // Function to handle form cancellation
  initialData?: Appointment; // Initial data for editing or rescheduling an appointment
  mode?: 'create' | 'edit' | 'reschedule'; // Mode to determine form behavior
  existingAppointments: Appointment[]; // List of existing appointments for conflict checking
}

// Functional component for creating or editing an appointment
const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
  onSubmit,
  onCancel,
  initialData,
  mode = 'create',
  existingAppointments,
}) => {
  
  // State to manage form data, initializing with either provided initial data or default values
  const [formData, setFormData] = useState({
    patientName: initialData?.patientName || '',
    doctorId: initialData?.doctorId || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    duration: initialData?.duration || 30, // Default duration is set to 30 minutes
    disease: initialData?.disease || '',
    severity: initialData?.severity || '',
    symptoms: initialData?.symptoms || [],
    symptomsDescription: initialData?.symptomsDescription || '',
    notes: initialData?.notes || '',
  });

  // State to store validation errors
  const [error, setError] = useState<string | null>(null);

  // Hook to fetch available slots for the selected doctor and date
  const { availableSlots, isLoading: isLoadingSlots } = useAvailableSlots(
    formData.doctorId,
    formData.date,
    mode === 'edit' ? initialData?.time : undefined // If editing, keep the initial time slot available
  );

  // Function to handle form field changes
  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null); // Reset error when the user makes a change
  };

  // Function to validate if the selected time slot is available
  const validateTimeSlot = () => {
    if (!formData.doctorId || !formData.date || !formData.time) {
      return false; // Ensure required fields are selected
    }

    // Check if the selected time slot is available
    const isAvailable = isTimeSlotAvailable(
      formData.doctorId,
      formData.date,
      formData.time,
      existingAppointments,
      initialData?.id // Allow same slot for editing
    );

    if (!isAvailable) {
      setError('This time slot is already booked. Please select another time.');
      return false;
    }

    return true;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateTimeSlot()) {
      return; // Stop submission if the time slot is not available
    }

    // Find the selected doctor details
    const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);
    if (!selectedDoctor) return;

    // Call the onSubmit function with the form data
    onSubmit({
      ...formData,
      doctorName: selectedDoctor.name,
      patientId: initialData?.patientId || 'temp-id', // Assign a temporary ID if not provided
      age: 0, // Default age (should be populated dynamically if available)
      contact: '', // Placeholder for contact details
      address: '', // Placeholder for address details
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Appointment form fields component */}
      <AppointmentFormFields
        formData={formData}
        doctors={doctors}
        availableSlots={availableSlots}
        isLoadingSlots={isLoadingSlots}
        error={error}
        onChange={handleChange}
      />
      
      {/* Medical information section */}
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

      {/* Form action buttons (Submit & Cancel) */}
      <AppointmentFormActions mode={mode} onCancel={onCancel} />
    </form>
  );
};

export default AppointmentForm;
