import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Appointment } from '../../types/appointment';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import AppointmentDetails from './AppointmentDetails';
import { useLoading } from '../../hooks/useLoading';
import LoadingOverlay from '../common/LoadingOverlay';
import { mockAppointments } from '../../data/mockAppointments';
import { mockDoctors } from '../../data/mockDoctors';
import SearchInput from '../common/SearchInput';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit' | 'reschedule'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingAppointment, setViewingAppointment] = useState<Appointment | null>(null);
  const { isLoading, withLoading } = useLoading();

  const filteredAppointments = appointments.filter(appointment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      appointment.patientName.toLowerCase().includes(searchLower) ||
      appointment.doctorName.toLowerCase().includes(searchLower) ||
      appointment.patientId.toLowerCase().includes(searchLower) ||
      appointment.date.includes(searchLower) ||
      appointment.status.toLowerCase().includes(searchLower)
    );
  });

  const handleCreateAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status'>) => {
    await withLoading(async () => {
      const newAppointment: Appointment = {
        ...appointmentData,
        id: `a${Date.now()}`,
        status: 'scheduled',
      };
      setAppointments((prev) => [...prev, newAppointment]);
      setIsFormOpen(false);
    });
  };

  const handleEditAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status'>) => {
    if (!selectedAppointment) return;

    await withLoading(async () => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...appointmentData, id: apt.id, status: apt.status }
            : apt
        )
      );
      setIsFormOpen(false);
      setSelectedAppointment(null);
    });
  };

  const handleRescheduleAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status'>) => {
    if (!selectedAppointment) return;

    await withLoading(async () => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === selectedAppointment.id
            ? { ...appointmentData, id: apt.id, status: 'rescheduled' }
            : apt
        )
      );
      setIsFormOpen(false);
      setSelectedAppointment(null);
    });
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    await withLoading(async () => {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? { ...apt, status: 'cancelled' }
            : apt
        )
      );
    });
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    await withLoading(async () => {
      setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
    });
  };

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormMode('reschedule');
    setIsFormOpen(true);
  };

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <button
          onClick={() => {
            setFormMode('create');
            setSelectedAppointment(null);
            setIsFormOpen(true);
          }}
          className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>New Appointment</span>
        </button>
      </div>

      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search appointments..."
      />

      <LoadingOverlay isLoading={isLoading}>
        {isFormOpen ? (
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
              onSubmit={getSubmitHandler()}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedAppointment(null);
              }}
              initialData={selectedAppointment || undefined}
              mode={formMode}
              existingAppointments={appointments}
            />
          </div>
        ) : (
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

      {viewingAppointment && (
        <AppointmentDetails
          appointment={viewingAppointment}
          onClose={() => setViewingAppointment(null)}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;