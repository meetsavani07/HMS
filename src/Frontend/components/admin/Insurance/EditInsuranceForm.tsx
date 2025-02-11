import React, { useState } from 'react';
import { X } from 'lucide-react'; // Importing the close icon from lucide-react
import type { Insurance } from '../../../types/insurance'; // Importing the Insurance type

// Define the props interface for the EditInsuranceForm component
interface EditInsuranceFormProps {
  isOpen: boolean; // Determines if the form is open or closed
  onClose: () => void; // Function to close the form
  onUpdate: (id: string, data: Insurance) => void; // Function to handle the update action
  insurance: Insurance; // The insurance data to be edited
}

// The functional component for editing insurance
const EditInsuranceForm: React.FC<EditInsuranceFormProps> = ({
  isOpen,
  onClose,
  onUpdate,
  insurance
}) => {
  // State to store the form data, initialized with the provided insurance data
  const [formData, setFormData] = useState(insurance);

  // Handle form submission to update the insurance data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onUpdate(insurance.id, formData); // Call the onUpdate function passed via props
    onClose(); // Close the form after submission
  };

  // If the form is not open, return null to avoid rendering the form
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button to close the form */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Form title */}
        <h2 className="text-2xl font-bold mb-6">Edit Insurance Plan</h2>

        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Provider input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider
            </label>
            <input
              type="text"
              required
              value={formData.provider} // Bind input value to formData.provider
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })} // Update formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Plan Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              required
              value={formData.planName} // Bind input value to formData.planName
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })} // Update formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Coverage input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coverage
            </label>
            <input
              type="text"
              required
              value={formData.coverage} // Bind input value to formData.coverage
              onChange={(e) => setFormData({ ...formData, coverage: e.target.value })} // Update formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date inputs for Start and End Date */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate} // Bind input value to formData.startDate
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} // Update formData on change
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate} // Bind input value to formData.endDate
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} // Update formData on change
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buyer Name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buyer Name
            </label>
            <input
              type="text"
              required
              value={formData.buyerName} // Bind input value to formData.buyerName
              onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })} // Update formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buyer Contact input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buyer Contact
            </label>
            <input
              type="text"
              required
              value={formData.buyerContact} // Bind input value to formData.buyerContact
              onChange={(e) => setFormData({ ...formData, buyerContact: e.target.value })} // Update formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status input (active or inactive) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status} // Bind the dropdown value to formData.status
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })} // Update formData on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons for cancel and submit */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose} // Close the form when clicked
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit" // Submit the form to update insurance
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Update Insurance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInsuranceForm;
