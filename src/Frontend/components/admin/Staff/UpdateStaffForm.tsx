import React, { useState } from 'react';
import { X } from 'lucide-react'; // Import the X icon for closing the form
import type { Staff } from '../../../types/staff'; // Import the Staff type to type-check staff-related data

// Defining the props for the UpdateStaffForm component
interface UpdateStaffFormProps {
  isOpen: boolean; // Controls whether the form is visible or not
  onClose: () => void; // Function to close the form
  onUpdate: (id: string, data: Omit<Staff, 'id'>) => void; // Function to handle the update of staff data
  staff: Staff; // The staff data to be updated
}

const UpdateStaffForm: React.FC<UpdateStaffFormProps> = ({ 
  isOpen, // Whether the form is open
  onClose, // Function to close the form
  onUpdate, // Function to update the staff data
  staff // The current staff data
}) => {
  // Initialize the form data with the current staff details
  const [formData, setFormData] = useState({
    name: staff.name, // Full name of the staff member
    specialization: staff.specialization, // Specialization or department/ward based on role
    qualification: staff.qualification, // Staff member's qualification
    experience: staff.experience.toString(), // Experience in years (as string for input control)
    contact: staff.contact, // Contact number
    email: staff.email, // Email address
    schedule: staff.schedule, // Work schedule (if relevant)
    isAvailable: staff.isAvailable, // Availability status
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Call onUpdate with the updated data, excluding the staff 'id' which is not part of the form
    onUpdate(staff.id, {
      ...formData,
      role: staff.role, // Keep the role unchanged
      experience: parseInt(formData.experience), // Parse experience back to a number
    });
    onClose(); // Close the form after updating
  };

  // If the form is not open, return null (render nothing)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" /> {/* Close icon */}
        </button>

        {/* Form title */}
        <h2 className="text-2xl font-bold mb-6">
          Update {staff.role === 'doctor' ? 'Doctor' : 'Nurse'} {/* Update form title based on staff role */}
        </h2>

        {/* The form itself */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Specialization or Department/Ward input based on role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {staff.role === 'doctor' ? 'Specialization' : 'Department/Ward'}
            </label>
            <input
              type="text"
              required
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Qualification input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualification
            </label>
            <input
              type="text"
              required
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (years)
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Availability status dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.isAvailable.toString()}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === 'true' })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel {/* Close the form without saving */}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Update {/* Submit the form to update staff */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStaffForm;
