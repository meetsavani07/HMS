import React from 'react';

interface AppointmentFormActionsProps {
  mode: 'create' | 'edit' | 'reschedule';
  onCancel: () => void;
}

const AppointmentFormActions: React.FC<AppointmentFormActionsProps> = ({
  mode,
  onCancel,
}) => {
  const getButtonText = () => {
    switch (mode) {
      case 'create':
        return 'Create Appointment';
      case 'edit':
        return 'Update Appointment';
      case 'reschedule':
        return 'Reschedule Appointment';
    }
  };

  return (
    <div className="flex justify-end space-x-3 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default AppointmentFormActions;