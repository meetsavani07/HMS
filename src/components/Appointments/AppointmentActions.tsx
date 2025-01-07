import React from 'react';
import { Edit2, X, RefreshCw, Trash2 } from 'lucide-react';
import type { Appointment } from '../../types/appointment';

interface AppointmentActionsProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onCancel: (appointmentId: string) => void;
  onDelete: (appointmentId: string) => void;
  onReschedule: (appointment: Appointment) => void;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointment,
  onEdit,
  onCancel,
  onDelete,
  onReschedule,
}) => {
  const isActive = appointment.status === 'scheduled';

  return (
    <div className="flex space-x-2">
      {isActive && (
        <>
          <button
            onClick={() => onEdit(appointment)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit appointment"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCancel(appointment.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Cancel appointment"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={() => onReschedule(appointment)}
            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
            title="Reschedule appointment"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </>
      )}
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