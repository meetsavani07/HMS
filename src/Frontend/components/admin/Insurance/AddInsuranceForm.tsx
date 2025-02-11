import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Insurance } from '../../../types/insurance';

interface AddInsuranceFormProps {
  isOpen: boolean; // Boolean to control if the form modal is open
  onClose: () => void; // Function to handle closing the form
  onSubmit: (data: Omit<Insurance, 'id'>) => void; // Function to handle form submission
}

const AddInsuranceForm: React.FC<AddInsuranceFormProps> = ({
  isOpen,    // Is the form open or not
  onClose,   // Function to close the form
  onSubmit,  // Function to submit the form data
}) => {
  // State to manage form data with initial values
  const [formData, setFormData] = useState({
    provider: '',
    planName: '',
    coverage: '',
    status: 'active' as const,  // Default status is 'active'
    startDate: new Date().toISOString().split('T')[0], // Default start date is today
    endDate: '',
    buyerName: '',
    buyerContact: '',
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(formData); // Submit the form data to the parent component
    onClose(); // Close the form after submission
  };

  // If the form is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button to exit the form */}
        <button
          onClick={onClose} // Call the onClose function when clicked
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" /> {/* Icon for the close button */}
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New Insurance Plan</h2>

        {/* Form for adding new insurance */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Provider input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider
            </label>
            <input
              type="text"
              required // Makes this field mandatory
              value={formData.provider} // Bind the input to the state
              onChange={(e) => setFormData({ ...formData, provider: e.target.value })} // Update the state on change
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Plan Name input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              required
              value={formData.planName}
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Coverage input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coverage
            </label>
            <input
              type="text"
              required
              value={formData.coverage}
              onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Full Coverage, Basic Coverage"
            />
          </div>

          {/* Date range fields (start and end date) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buyer Name input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buyer Name
            </label>
            <input
              type="text"
              required
              value={formData.buyerName}
              onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buyer Contact input field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buyer Contact
            </label>
            <input
              type="text"
              required
              value={formData.buyerContact}
              onChange={(e) => setFormData({ ...formData, buyerContact: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action buttons for cancel and submit */}
          <div className="flex justify-end space-x-3 mt-6">
            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose} // Close the form without saving
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            {/* Submit button */}
            <button
              type="submit" // Submit the form
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Insurance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInsuranceForm;
