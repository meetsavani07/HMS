import React, { useState } from 'react'; // Importing React and useState hook
import { X } from 'lucide-react'; // Importing X (close) icon from lucide-react

// Define the Ticket interface for type-checking the ticket data structure
interface Ticket {
  id: string; // Unique identifier for the ticket
  subject: string; // Subject of the ticket
  department: string; // Department handling the ticket
  priority: 'low' | 'medium' | 'high'; // Priority of the ticket
  status: 'open' | 'in-progress' | 'resolved'; // Current status of the ticket
  createdAt: string; // Date when the ticket was created
  lastUpdated: string; // Date when the ticket was last updated
}

// Define the props for the EditTicketForm component
interface EditTicketFormProps {
  isOpen: boolean; // Controls whether the form modal is open
  onClose: () => void; // Function to close the form
  onUpdate: (id: string, data: Ticket) => void; // Function to update the ticket
  ticket: Ticket; // The ticket data to be edited
}

// EditTicketForm component definition
const EditTicketForm: React.FC<EditTicketFormProps> = ({
  isOpen,
  onClose,
  onUpdate,
  ticket
}) => {
  // State to manage form data
  const [formData, setFormData] = useState(ticket); // Initialize with the ticket data passed as a prop

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Update the ticket with the new data, and update the lastUpdated field
    onUpdate(ticket.id, {
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0] // Sets the last updated date to the current date
    });
    onClose(); // Close the form after updating
  };

  // If the form is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal container with white background, rounded corners, and padding */}
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose} // Closes the form
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" /> {/* Close icon */}
        </button>

        {/* Title of the modal */}
        <h2 className="text-2xl font-bold mb-6">Edit Support Ticket</h2>

        {/* Form for editing the ticket */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              value={formData.subject} // Controlled input with value from formData
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })} // Update the subject in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              required
              value={formData.department} // Controlled input with value from formData
              onChange={(e) => setFormData({ ...formData, department: e.target.value })} // Update the department in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority select field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority} // Controlled select with value from formData
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })} // Update priority in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status select field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status} // Controlled select with value from formData
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'open' | 'in-progress' | 'resolved' })} // Update status in formData
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Action buttons (Cancel and Submit) */}
          <div className="flex justify-end space-x-3 mt-6">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose} // Closes the form without saving changes
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit" // Submits the form
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicketForm;
