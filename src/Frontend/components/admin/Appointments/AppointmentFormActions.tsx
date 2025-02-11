import React from 'react';

interface AppointmentFormActionsProps {
  mode: 'create' | 'edit' | 'reschedule';  // Mode determines the action type (create, edit, or reschedule)
  onCancel: () => void;  // Function to handle cancel action
}

const AppointmentFormActions: React.FC<AppointmentFormActionsProps> = ({
  mode,
  onCancel,
}) => {
  
  // Function to dynamically change the button text based on the mode
  const getButtonText = () => {
    switch (mode) {
      case 'create':
        return 'Create Appointment';  // Text for the create mode button
      case 'edit':
        return 'Update Appointment';  // Text for the edit mode button
      case 'reschedule':
        return 'Reschedule Appointment';  // Text for the reschedule mode button
      default:
        return '';  // Default case (though not expected in this scenario)
    }
  };

  return (
    <div className="flex justify-end space-x-3 mt-6">
      {/* Cancel button */}
      <button
        type="button"
        onClick={onCancel}  // Triggers the onCancel function passed from parent
        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>

      {/* Submit button with dynamic text */}
      <button
        type="submit"  // Submits the form
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {getButtonText()}  {/* Button text depends on the current mode */}
      </button>
    </div>
  );
};

export default AppointmentFormActions;
