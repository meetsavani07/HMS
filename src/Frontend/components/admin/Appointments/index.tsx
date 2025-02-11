import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Appointment } from '../../../types/appointment';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import AppointmentDetails from './AppointmentDetails';
import { useLoading } from '../../../hooks/useLoading';
import LoadingOverlay from '../../common/LoadingOverlay';
import { mockAppointments } from '../../../data/mockAppointments';
import { mockDoctors } from '../../../data/mockDoctors';
import SearchInput from '../../common/SearchInput';

const AppointmentsPage: React.FC = () => {
  // State to store the list of appointments, form visibility, selected appointment for editing/rescheduling
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments); // initial mock appointments
  const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle the form visibility
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null); // State to hold selected appointment for editing/rescheduling
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'reschedule'>( // Determines whether form is in create, edit or reschedule mode
    'create'
  );
  const [searchTerm, setSearchTerm] = useState(''); // Search input value for filtering appointments
  const [viewingAppointment, setViewingAppointment] =
    useState<Appointment | null>(null); // State to store the appointment being viewed in detail
  const { isLoading, withLoading } = useLoading(); // Custom hook to manage loading state

  // Filter appointments based on search term (it checks across multiple fields)
  const filteredAppointments = appointments.filter((appointment) => {
    const searchLower = searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive comparison
    return (
      appointment.patientName.toLowerCase().includes(searchLower) || // Match patient name
      appointment.doctorName.toLowerCase().includes(searchLower) || // Match doctor name
      appointment.patientId.toLowerCase().includes(searchLower) || // Match patient ID
      appointment.date.includes(searchLower) || // Match appointment date
      appointment.status.toLowerCase().includes(searchLower) // Match appointment status
    );
  });

  // Create a new appointment
  const handleCreateAppointment = async (
    appointmentData: Omit<Appointment, 'id' | 'status'> // Exclude id and status for the create form
  ) => {
    await withLoading(async () => {
      const newAppointment: Appointment = {
        ...appointmentData, // Spread the data passed from the form
        id: `a${Date.now()}`, // Generate a unique ID using the current timestamp
        status: 'scheduled', // New appointments are 'scheduled'
      };
      setAppointments((prev) => [...prev, newAppointment]); // Add new appointment to state
      setIsFormOpen(false); // Close the form
    });
  };

  // Edit an existing appointment
  const handleEditAppointment = async (
    appointmentData: Omit<Appointment, 'id' | 'status'> // Exclude id and status for editing
  ) => {
    if (!selectedAppointment) return; // If no appointment is selected, exit

    await withLoading(async () => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...appointmentData, id: apt.id, status: apt.status } // Keep the id and status the same, only update the rest of the fields
            : apt
        )
      );
      setIsFormOpen(false); // Close the form
      setSelectedAppointment(null); // Reset selected appointment
    });
  };

  // Reschedule an appointment
  const handleRescheduleAppointment = async (
    appointmentData: Omit<Appointment, 'id' | 'status'> // Exclude id and status for rescheduling
  ) => {
    if (!selectedAppointment) return; // If no appointment is selected, exit

    await withLoading(async () => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...appointmentData, id: apt.id, status: 'rescheduled' } // Mark the appointment as rescheduled
            : apt
        )
      );
      setIsFormOpen(false); // Close the form
      setSelectedAppointment(null); // Reset selected appointment
    });
  };

  // Cancel an appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    await withLoading(async () => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt // Change the status of the selected appointment to 'cancelled'
        )
      );
    });
  };

  // Delete an appointment
  const handleDeleteAppointment = async (appointmentId: string) => {
    await withLoading(async () => {
      setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId)); // Remove the appointment from the list
    });
  };

  // Open the form to edit an appointment
  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormMode('edit');
    setIsFormOpen(true); // Set form mode to 'edit' and open the form
  };

  // Open the form to reschedule an appointment
  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormMode('reschedule');
    setIsFormOpen(true); // Set form mode to 'reschedule' and open the form
  };

  // Return the correct submit handler based on form mode (create, edit, or reschedule)
  const getSubmitHandler = () => {
    switch (formMode) {
      case 'edit':
        return handleEditAppointment;
      case 'reschedule':
        return handleRescheduleAppointment;
      default:
        return handleCreateAppointment;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header and New Appointment button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">Appointments</h2>
        <button
          onClick={() => {
            setFormMode('create');
            setSelectedAppointment(null);
            setIsFormOpen(true); // Open form in 'create' mode
          }}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-300 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Search input for filtering appointments */}
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search appointments..."
      />

      {/* Loading overlay and form or list display */}
      <LoadingOverlay isLoading={isLoading}>
        {isFormOpen ? (
          // Show form if it's open
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              {formMode === 'create'
                ? 'Create New Appointment'
                : formMode === 'edit'
                ? 'Edit Appointment'
                : 'Reschedule Appointment'}
            </h3>
            <AppointmentForm
              doctors={mockDoctors}
              onSubmit={getSubmitHandler()} // Use the appropriate submit handler
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedAppointment(null); // Close form and reset selected appointment
              }}
              initialData={selectedAppointment || undefined} // Pass initial data if editing or rescheduling
              mode={formMode}
              existingAppointments={appointments} // Pass existing appointments for validation
            />
          </div>
        ) : (
          // Show appointment list if form is not open
          <AppointmentList
            appointments={filteredAppointments}
            onEdit={handleEdit}
            onCancel={handleCancelAppointment}
            onDelete={handleDeleteAppointment}
            onReschedule={handleReschedule}
            onViewDetails={setViewingAppointment}
          />
        )}
      </LoadingOverlay>

      {/* View appointment details if an appointment is selected */}
      {viewingAppointment && (
        <AppointmentDetails
          appointment={viewingAppointment}
          onClose={() => setViewingAppointment(null)} // Close the details view
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
