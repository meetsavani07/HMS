import React, { useState } from 'react'; // Importing React and useState hook
import { X } from 'lucide-react'; // Importing the X (close) icon from lucide-react

// Define the AddTicketFormProps interface for the component's props
interface AddTicketFormProps {
  isOpen: boolean; // Whether the form is open or not
  onClose: () => void; // Function to close the form
  onSubmit: (data: any) => void; // Function to submit the new ticket data
}

// AddTicketForm component definition
const AddTicketForm: React.FC<AddTicketFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    subject: '', // Subject of the ticket
    department: '', // Department handling the ticket
    priority: 'low' as const, // Default priority set to 'low'
    status: 'open' as const, // Default status set to 'open'
    createdAt: new Date().toISOString().split('T')[0], // Sets the current date as the created date
    lastUpdated: new Date().toISOString().split('T')[0], // Sets the current date as the last updated date
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Generate a unique ID for the new ticket and pass the form data to the onSubmit callback
    onSubmit({
      ...formData,
      id: `t${Date.now()}`, // Generates a unique ticket ID based on the current timestamp
    });
    onClose(); // Close the form after submitting the data
  };

  // If the form is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal container with background overlay */}
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose} // Closes the form
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" /> {/* Close icon */}
        </button>

        {/* Title of the modal */}
        <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>

        {/* Form to create a new ticket */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              value={formData.subject} // Controlled input, value comes from formData
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} // Updates the subject in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the issue" // Placeholder text
            />
          </div>

          {/* Department select field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              required
              value={formData.department} // Controlled select, value comes from formData
              onChange={(e) => setFormData({ ...formData, department: e.target.value })} // Updates department in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {/* Options for departments */}
              <option value="">Select department</option>
              <option value="IT Support">IT Support</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Administration">Administration</option>
              <option value="Medical Equipment">Medical Equipment</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Priority select field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              required
              value={formData.priority} // Controlled select, value comes from formData
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })} // Updates priority in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {/* Options for priority */}
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Action buttons (Cancel and Submit) */}
          <div className="flex justify-end space-x-3 mt-6">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose} // Closes the form without submitting
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit" // Submits the form
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicketForm;
