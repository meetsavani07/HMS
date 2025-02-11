import React from 'react';
import { Edit2, X, RefreshCw, Trash2 } from 'lucide-react'; // Import icons for action buttons
import type { Appointment } from '../../../types/appointment';

// Define the interface for the component's props
interface AppointmentActionsProps {
  appointment: Appointment; // Appointment data
  onEdit: (appointment: Appointment) => void; // Function to handle editing an appointment
  onCancel: (appointmentId: string) => void; // Function to handle canceling an appointment
  onDelete: (appointmentId: string) => void; // Function to handle deleting an appointment
  onReschedule: (appointment: Appointment) => void; // Function to handle rescheduling an appointment
}

// Functional component for displaying appointment action buttons
const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointment,
  onEdit,
  onCancel,
  onDelete,
  onReschedule,
}) => {
  // Check if the appointment is currently active (scheduled)
  const isActive = appointment.status === 'scheduled';

  return (
    <div className="flex space-x-2">
      {/* If the appointment is active (scheduled), show Edit, Cancel, and Reschedule buttons */}
      {isActive && (
        <>
          {/* Edit button: Allows modifying the appointment details */}
          <button
            onClick={() => onEdit(appointment)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit appointment"
          >
            <Edit2 className="h-4 w-4" />
          </button>

          {/* Cancel button: Marks the appointment as canceled */}
          <button
            onClick={() => onCancel(appointment.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Cancel appointment"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Reschedule button: Allows changing the appointment time */}
          <button
            onClick={() => onReschedule(appointment)}
            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
            title="Reschedule appointment"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </>
      )}

      {/* If the appointment is not active (e.g., canceled or completed), show Delete button */}
      {!isActive && (
        <button
          onClick={() => onDelete(appointment.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Delete appointment"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AppointmentActions;
